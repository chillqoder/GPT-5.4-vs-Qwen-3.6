import { ArrowRightLeft } from 'lucide-react'
import { COIN_ORDER } from '../lib/coins.js'
import { formatAssetAmount, formatUsd } from '../lib/format.js'
import type { PriceEntry, SupportedSymbol } from '../types.js'

export function ConverterPanel({
  amount,
  convertedAmount,
  fromPrice,
  fromSymbol,
  onAmountChange,
  onFromSymbolChange,
  onSwap,
  onToSymbolChange,
  toPrice,
  toSymbol,
}: {
  amount: string
  convertedAmount: number | null
  fromPrice: PriceEntry | undefined
  fromSymbol: SupportedSymbol
  onAmountChange: (value: string) => void
  onFromSymbolChange: (value: SupportedSymbol) => void
  onSwap: () => void
  onToSymbolChange: (value: SupportedSymbol) => void
  toPrice: PriceEntry | undefined
  toSymbol: SupportedSymbol
}) {
  return (
    <aside className="glass-panel rounded-[2rem] p-6 sm:p-8">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
        Converter Panel
      </p>
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white">
        Convert via USD base pricing
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
        All conversions are normalized through USD with the formula amount x
        priceA / priceB.
      </p>

      <div className="mt-8 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-300">
            Amount
          </span>
          <div className="field-shell">
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(event) => onAmountChange(event.target.value)}
              className="w-full bg-transparent text-lg font-semibold outline-none"
              placeholder="Enter amount"
            />
          </div>
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              From
            </span>
            <div className="field-shell">
              <select
                value={fromSymbol}
                onChange={(event) =>
                  onFromSymbolChange(event.target.value as SupportedSymbol)
                }
                className="w-full bg-transparent text-lg font-semibold outline-none"
              >
                {COIN_ORDER.map((symbol) => (
                  <option key={symbol} value={symbol} className="bg-slate-900">
                    {symbol}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <button
            type="button"
            onClick={onSwap}
            className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-slate-200 transition hover:border-sky-300/40 hover:bg-white/10"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              To
            </span>
            <div className="field-shell">
              <select
                value={toSymbol}
                onChange={(event) =>
                  onToSymbolChange(event.target.value as SupportedSymbol)
                }
                className="w-full bg-transparent text-lg font-semibold outline-none"
              >
                {COIN_ORDER.map((symbol) => (
                  <option key={symbol} value={symbol} className="bg-slate-900">
                    {symbol}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
      </div>

      <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
          Live result
        </p>
        <p className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-white">
          {convertedAmount !== null
            ? `${formatAssetAmount(convertedAmount)} ${toSymbol}`
            : 'Waiting for feed'}
        </p>
        <p className="mt-2 text-sm text-slate-400">
          {amount || '0'} {fromSymbol} converts into {toSymbol} using current
          USD reference prices.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
          <p className="text-sm text-slate-400">{fromSymbol} price</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {fromPrice ? formatUsd(fromPrice.priceUsd) : 'Loading'}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
          <p className="text-sm text-slate-400">{toSymbol} price</p>
          <p className="mt-2 text-xl font-semibold text-white">
            {toPrice ? formatUsd(toPrice.priceUsd) : 'Loading'}
          </p>
        </div>
      </div>
    </aside>
  )
}
