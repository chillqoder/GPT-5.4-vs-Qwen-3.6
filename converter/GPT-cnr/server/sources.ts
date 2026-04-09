import * as cheerio from 'cheerio'
import type { CoinDefinition } from './coins.js'
import type { SourceSnapshot } from './types.js'

const DEFAULT_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'accept-language': 'en-US,en;q=0.9',
  pragma: 'no-cache',
  'cache-control': 'no-cache',
}

interface CoinMarketCapQuote {
  symbol: string
  p: number
  p24h?: number
  t?: number
}

function isFinitePositive(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value > 0
}

function parseNumberish(value: unknown): number | null {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value !== 'string') {
    return null
  }

  const normalized = value.replace(/[$,%\s,]/g, '')
  const numeric = Number(normalized)
  return Number.isFinite(numeric) ? numeric : null
}

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: DEFAULT_HEADERS,
    signal: AbortSignal.timeout(12_000),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return response.text()
}

function extractCoinMarketCapQuote(
  html: string,
  coin: CoinDefinition,
): SourceSnapshot | null {
  const quotesMatch = html.match(/"quotesLatestData":(\[[\s\S]*?\]),"language":/)
  const quotes = quotesMatch
    ? (JSON.parse(quotesMatch[1]) as CoinMarketCapQuote[])
    : []

  const quote = quotes.find(
    (candidate) =>
      candidate.symbol === coin.symbol && isFinitePositive(parseNumberish(candidate.p)),
  )

  if (quote) {
    const priceUsd = parseNumberish(quote.p)
    const change24h = parseNumberish(quote.p24h ?? null)

    if (isFinitePositive(priceUsd)) {
      return {
        symbol: coin.symbol,
        priceUsd,
        change24h,
        freshness: 'live',
        source: 'CoinMarketCap',
        updatedAt: quote.t ? new Date(quote.t).toISOString() : new Date().toISOString(),
      }
    }
  }

  const metaPriceMatch = html.match(/The live .*? price today is \$([0-9.,]+)/i)
  const priceUsd = parseNumberish(metaPriceMatch?.[1] ?? null)

  if (!isFinitePositive(priceUsd)) {
    return null
  }

  const changeMatch = html.match(
    new RegExp(`"symbol":"${coin.symbol}".{0,180}"p24h":(-?\\d+(?:\\.\\d+)?)`),
  )

  return {
    symbol: coin.symbol,
    priceUsd,
    change24h: parseNumberish(changeMatch?.[1] ?? null),
    freshness: 'live',
    source: 'CoinMarketCap',
    updatedAt: new Date().toISOString(),
  }
}

function collectJsonLd(value: unknown, results: Record<string, unknown>[]): void {
  if (Array.isArray(value)) {
    value.forEach((entry) => collectJsonLd(entry, results))
    return
  }

  if (value && typeof value === 'object') {
    results.push(value as Record<string, unknown>)
  }
}

function extractCoinCarpQuote(
  html: string,
  coin: CoinDefinition,
): SourceSnapshot | null {
  const $ = cheerio.load(html)
  const jsonLdEntries: Record<string, unknown>[] = []

  $('script[type="application/ld+json"]').each((_, element) => {
    const raw = $(element).html()

    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw)
      collectJsonLd(parsed, jsonLdEntries)
    } catch {
      // Ignore malformed scripts and keep searching.
    }
  })

  const productEntry = jsonLdEntries.find((entry) => entry['@type'] === 'Product')
  const offers =
    productEntry && typeof productEntry.offers === 'object' && productEntry.offers
      ? (productEntry.offers as Record<string, unknown>)
      : null

  const priceUsd = parseNumberish(offers?.price ?? null)

  if (isFinitePositive(priceUsd)) {
    return {
      symbol: coin.symbol,
      priceUsd,
      change24h: null,
      freshness: 'fallback',
      source: 'CoinCarp',
      updatedAt: new Date().toISOString(),
    }
  }

  const faqMatch = html.match(
    new RegExp(`The current ${coin.name} usd price is \\$([0-9.,]+)`, 'i'),
  )
  const fallbackPrice = parseNumberish(faqMatch?.[1] ?? null)

  if (!isFinitePositive(fallbackPrice)) {
    return null
  }

  return {
    symbol: coin.symbol,
    priceUsd: fallbackPrice,
    change24h: null,
    freshness: 'fallback',
    source: 'CoinCarp',
    updatedAt: new Date().toISOString(),
  }
}

export async function fetchFromCoinMarketCap(
  coin: CoinDefinition,
): Promise<SourceSnapshot> {
  const html = await fetchHtml(
    `https://coinmarketcap.com/currencies/${coin.coinMarketCapSlug}/`,
  )
  const quote = extractCoinMarketCapQuote(html, coin)

  if (!quote) {
    throw new Error(`CoinMarketCap parsing failed for ${coin.symbol}`)
  }

  return quote
}

export async function fetchFromCoinCarp(
  coin: CoinDefinition,
): Promise<SourceSnapshot> {
  const html = await fetchHtml(
    `https://www.coincarp.com/currencies/${coin.coinCarpSlug}/`,
  )
  const quote = extractCoinCarpQuote(html, coin)

  if (!quote) {
    throw new Error(`CoinCarp parsing failed for ${coin.symbol}`)
  }

  return quote
}
