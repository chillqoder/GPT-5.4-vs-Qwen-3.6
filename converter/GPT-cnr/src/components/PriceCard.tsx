import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { formatChange, formatUsd } from '../lib/format.js'
import type { PriceEntry } from '../types.js'

export function PriceCard({
  isLeader,
  meta,
  price,
}: {
  isLeader: boolean
  meta: {
    accent: string
    mark: string
    name: string
    ringClass: string
    surfaceClass: string
  }
  price: PriceEntry
}) {
  const isPositive = (price.change24h ?? 0) >= 0
  const freshnessLabel =
    price.freshness === 'live'
      ? 'Live'
      : price.freshness === 'fallback'
        ? 'Fallback'
        : 'Cached'

  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_16px_60px_rgba(2,8,23,0.24)] transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${meta.surfaceClass} opacity-90`}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 font-display text-sm font-semibold text-white ring-1 ${meta.ringClass}`}
              style={{ boxShadow: `0 0 0 1px ${meta.accent}40 inset` }}
            >
              {meta.mark}
            </div>
            <div>
              <p className="text-lg font-semibold text-white">{price.symbol}</p>
              <p className="text-sm text-slate-400">{meta.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-300">
              {freshnessLabel}
            </span>
            {isLeader ? (
              <span className="rounded-full bg-sky-500/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-100">
                24h leader
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-3xl font-semibold tracking-[-0.03em] text-white">
            {formatUsd(price.priceUsd)}
          </p>
          <div className="mt-4 flex items-center justify-between gap-4">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${
                price.change24h === null
                  ? 'bg-white/10 text-slate-300'
                  : isPositive
                    ? 'bg-emerald-500/12 text-emerald-300'
                    : 'bg-rose-500/12 text-rose-300'
              }`}
            >
              {price.change24h === null ? null : isPositive ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {formatChange(price.change24h)}
            </div>

            <p className="text-sm text-slate-400">{price.source}</p>
          </div>
        </div>
      </div>
    </article>
  )
}
