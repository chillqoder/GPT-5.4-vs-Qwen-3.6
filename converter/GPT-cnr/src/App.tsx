import {
  Activity,
  Clock3,
  DatabaseZap,
  RefreshCw,
  ShieldCheck,
  TriangleAlert,
} from 'lucide-react'
import { startTransition, useEffect, useEffectEvent } from 'react'
import { ConverterPanel } from './components/ConverterPanel.js'
import { PriceCard } from './components/PriceCard.js'
import { SkeletonGrid } from './components/SkeletonGrid.js'
import { COIN_META, COIN_ORDER } from './lib/coins.js'
import {
  formatAssetAmount,
  formatChange,
  formatTimestamp,
} from './lib/format.js'
import { useMarketStore } from './store/market.js'

function InsightTile({
  label,
  value,
  detail,
  icon: Icon,
}: {
  label: string
  value: string
  detail: string
  icon: typeof Activity
}) {
  return (
    <div className="glass-panel rounded-3xl p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-white/10 p-3 text-sky-200">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">{detail}</p>
    </div>
  )
}

function App() {
  const {
    amount,
    error,
    fetchPrices,
    fromSymbol,
    isLoading,
    isRefreshing,
    lastUpdated,
    prices,
    setAmount,
    setFromSymbol,
    setToSymbol,
    swapSymbols,
    toSymbol,
    warning,
  } = useMarketStore()

  const refreshPrices = useEffectEvent((force = false) => {
    startTransition(() => {
      void fetchPrices(force)
    })
  })

  const handleManualRefresh = () => {
    startTransition(() => {
      void fetchPrices(true)
    })
  }

  useEffect(() => {
    refreshPrices(false)

    const interval = window.setInterval(() => {
      refreshPrices(false)
    }, 60_000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const pricesBySymbol = new Map(prices.map((price) => [price.symbol, price]))
  const fromPrice = pricesBySymbol.get(fromSymbol)
  const toPrice = pricesBySymbol.get(toSymbol)
  const numericAmount = Number(amount)
  const hasValidAmount = Number.isFinite(numericAmount) && numericAmount >= 0
  const convertedAmount =
    hasValidAmount && fromPrice && toPrice
      ? (numericAmount * fromPrice.priceUsd) / toPrice.priceUsd
      : null

  const leader =
    prices
      .filter((price) => price.change24h !== null)
      .sort((left, right) => (right.change24h ?? 0) - (left.change24h ?? 0))[0] ??
    null

  const averageDisplayedPrice =
    prices.length > 0
      ? prices.reduce((total, price) => total + price.priceUsd, 0) / prices.length
      : 0

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="glass-panel soft-grid overflow-hidden rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2">
                    <span className="rounded-full bg-sky-400/15 px-2 py-1 font-display text-xs font-semibold uppercase tracking-[0.26em] text-sky-200">
                      CNR
                    </span>
                    <span className="text-xs uppercase tracking-[0.26em] text-slate-400">
                      Backend-only scraping
                    </span>
                  </div>
                  <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                    Live crypto prices and instant conversion without official
                    APIs.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                    The dashboard scrapes public market pages on the server,
                    normalizes everything into USD, and refreshes every 60
                    seconds with fallback sources and cache protection.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={isRefreshing}
                  className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/12 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-500/18 disabled:cursor-wait disabled:opacity-70"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                  />
                  Refresh now
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <InsightTile
                  label="Coverage"
                  value="10 tracked assets"
                  detail="BTC, ETH, USDT, BNB, SOL, XRP, ADA, DOGE, TON, and TRX."
                  icon={Activity}
                />
                <InsightTile
                  label="Cadence"
                  value="60 second sync"
                  detail="Background refresh plus manual refresh with request coalescing."
                  icon={Clock3}
                />
                <InsightTile
                  label="Fallback Chain"
                  value="CMC -> CoinCarp -> Cache"
                  detail="If a live source breaks, the backend steps down gracefully."
                  icon={DatabaseZap}
                />
                <InsightTile
                  label="Market Pulse"
                  value={
                    leader
                      ? `${leader.symbol} ${formatChange(leader.change24h)}`
                      : 'Waiting for live quotes'
                  }
                  detail="Strongest 24h mover across the supported dashboard set."
                  icon={ShieldCheck}
                />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Session Snapshot
            </p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-sm text-slate-400">Last update</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatTimestamp(lastUpdated)}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Example conversion</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {convertedAmount !== null
                    ? `${amount || '0'} ${fromSymbol} -> ${formatAssetAmount(
                        convertedAmount,
                      )} ${toSymbol}`
                    : 'Waiting for price feed'}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Average dashboard price</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {prices.length > 0
                    ? `$${formatAssetAmount(averageDisplayedPrice)}`
                    : 'Loading'}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Reliability Rules
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                <li>Scraping stays on the backend only.</li>
                <li>Only validated USD prices enter the store.</li>
                <li>Cached prices return when live pages fail.</li>
              </ul>
            </div>
          </div>
        </section>

        {warning ? (
          <div className="glass-panel flex items-start gap-3 rounded-3xl border border-amber-400/25 bg-amber-500/10 p-4 text-amber-50">
            <TriangleAlert className="mt-0.5 h-5 w-5 flex-none text-amber-300" />
            <div>
              <p className="font-semibold">Using last known prices</p>
              <p className="mt-1 text-sm text-amber-100/85">
                Some live sources failed, so cached market data is being served
                until a fresh scrape succeeds.
              </p>
            </div>
          </div>
        ) : null}

        {error && prices.length > 0 ? (
          <div className="glass-panel rounded-3xl border border-rose-500/20 bg-rose-500/8 p-4 text-sm text-rose-100">
            {error}
          </div>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                  Price Grid
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
                  Market overview
                </h2>
              </div>

              <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-300">
                Auto-refreshing every 60 seconds
              </div>
            </div>

            {isLoading && prices.length === 0 ? (
              <SkeletonGrid />
            ) : null}

            {!isLoading && prices.length === 0 ? (
              <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/20 p-8 text-center">
                <p className="text-lg font-semibold text-white">
                  The market feed is unavailable right now.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  {error ?? 'Try a manual refresh to request another scrape.'}
                </p>
                <button
                  type="button"
                  onClick={handleManualRefresh}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/12 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-500/18"
                >
                  <RefreshCw className="h-4 w-4" />
                  Retry feed
                </button>
              </div>
            ) : null}

            {prices.length > 0 ? (
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {COIN_ORDER.map((symbol) => {
                  const price = pricesBySymbol.get(symbol)

                  if (!price) {
                    return null
                  }

                  return (
                    <PriceCard
                      key={price.symbol}
                      meta={COIN_META[price.symbol]}
                      price={price}
                      isLeader={leader?.symbol === price.symbol}
                    />
                  )
                })}
              </div>
            ) : null}
          </div>

          <ConverterPanel
            amount={amount}
            convertedAmount={convertedAmount}
            fromPrice={fromPrice}
            fromSymbol={fromSymbol}
            onAmountChange={setAmount}
            onFromSymbolChange={setFromSymbol}
            onSwap={swapSymbols}
            onToSymbolChange={setToSymbol}
            toPrice={toPrice}
            toSymbol={toSymbol}
          />
        </section>
      </div>
    </main>
  )
}

export default App
