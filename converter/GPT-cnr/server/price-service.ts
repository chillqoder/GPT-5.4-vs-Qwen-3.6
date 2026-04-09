import { SUPPORTED_COINS, type SupportedSymbol } from './coins.js'
import { fetchFromCoinCarp, fetchFromCoinMarketCap } from './sources.js'
import type { CoinPrice, PricesPayload, SourceSnapshot } from './types.js'

export const CACHE_TTL_MS = 60_000

interface CachedState {
  fetchedAtMs: number
  payload: PricesPayload
}

let cachedState: CachedState | null = null
let inFlightRefresh: Promise<PricesPayload> | null = null
let backgroundRefreshStarted = false

function clonePayload(payload: PricesPayload, fetchedAtMs: number): PricesPayload {
  return {
    ...payload,
    cacheAgeMs: Math.max(0, Date.now() - fetchedAtMs),
    prices: payload.prices.map((price) => ({ ...price })),
  }
}

function getCachedPriceMap(): Map<SupportedSymbol, CoinPrice> {
  return new Map(
    (cachedState?.payload.prices ?? []).map((price) => [price.symbol, { ...price }]),
  )
}

async function mapWithConcurrency<T, R>(
  items: readonly T[],
  limit: number,
  iteratee: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length)
  let cursor = 0

  async function worker(): Promise<void> {
    while (cursor < items.length) {
      const currentIndex = cursor
      cursor += 1
      results[currentIndex] = await iteratee(items[currentIndex])
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker())
  await Promise.all(workers)
  return results
}

async function capture<T>(task: () => Promise<T>): Promise<T | null> {
  try {
    return await task()
  } catch {
    return null
  }
}

async function refreshMarket(): Promise<PricesPayload> {
  const cachedPrices = getCachedPriceMap()

  const primarySnapshots = await mapWithConcurrency(SUPPORTED_COINS, 3, (coin) =>
    capture(() => fetchFromCoinMarketCap(coin)),
  )

  const primaryBySymbol = new Map(
    primarySnapshots
      .filter((snapshot): snapshot is SourceSnapshot => snapshot !== null)
      .map((snapshot) => [snapshot.symbol, snapshot]),
  )

  const fallbackCandidates = SUPPORTED_COINS.filter(
    (coin) => !primaryBySymbol.has(coin.symbol),
  )

  const fallbackSnapshots = await mapWithConcurrency(fallbackCandidates, 2, (coin) =>
    capture(() => fetchFromCoinCarp(coin)),
  )

  const fallbackBySymbol = new Map(
    fallbackSnapshots
      .filter((snapshot): snapshot is SourceSnapshot => snapshot !== null)
      .map((snapshot) => [snapshot.symbol, snapshot]),
  )

  let usedCache = false

  const prices: CoinPrice[] = SUPPORTED_COINS.map((coin): CoinPrice => {
    const primary = primaryBySymbol.get(coin.symbol)

    if (primary) {
      return {
        symbol: coin.symbol,
        name: coin.name,
        priceUsd: primary.priceUsd,
        change24h: primary.change24h,
        freshness: primary.freshness,
        source: primary.source,
        updatedAt: primary.updatedAt,
      }
    }

    const fallback = fallbackBySymbol.get(coin.symbol)

    if (fallback) {
      return {
        symbol: coin.symbol,
        name: coin.name,
        priceUsd: fallback.priceUsd,
        change24h:
          fallback.change24h ?? cachedPrices.get(coin.symbol)?.change24h ?? null,
        freshness: fallback.freshness,
        source: fallback.source,
        updatedAt: fallback.updatedAt,
      }
    }

    const cached = cachedPrices.get(coin.symbol)

    if (cached) {
      usedCache = true

      return {
        ...cached,
        source: 'Cache',
        freshness: 'cached',
      }
    }

    throw new Error(`No usable price snapshot for ${coin.symbol}`)
  })

  const payload: PricesPayload = {
    prices,
    lastUpdated: new Date().toISOString(),
    cacheAgeMs: 0,
    warning: usedCache ? 'Using last known prices' : null,
  }

  cachedState = {
    payload,
    fetchedAtMs: Date.now(),
  }

  return clonePayload(payload, cachedState.fetchedAtMs)
}

export async function getMarketPrices(
  options: { force?: boolean } = {},
): Promise<PricesPayload> {
  const isCacheFresh =
    cachedState !== null && Date.now() - cachedState.fetchedAtMs < CACHE_TTL_MS

  if (!options.force && cachedState && isCacheFresh) {
    return clonePayload(cachedState.payload, cachedState.fetchedAtMs)
  }

  if (inFlightRefresh) {
    return inFlightRefresh
  }

  inFlightRefresh = refreshMarket()
    .catch((error) => {
      if (cachedState) {
        const stalePayload = clonePayload(cachedState.payload, cachedState.fetchedAtMs)

        return {
          ...stalePayload,
          warning: 'Using last known prices',
        }
      }

      throw error
    })
    .finally(() => {
      inFlightRefresh = null
    })

  return inFlightRefresh
}

export function startBackgroundRefresh(): void {
  if (backgroundRefreshStarted) {
    return
  }

  backgroundRefreshStarted = true

  void getMarketPrices({ force: true }).catch((error) => {
    console.error('[refresh:init]', error)
  })

  const timer = setInterval(() => {
    void getMarketPrices({ force: true }).catch((error) => {
      console.error('[refresh:interval]', error)
    })
  }, CACHE_TTL_MS)

  timer.unref?.()
}
