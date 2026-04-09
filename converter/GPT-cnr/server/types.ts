import type { SupportedSymbol } from './coins.js'

export type QuoteFreshness = 'live' | 'fallback' | 'cached'
export type QuoteSource = 'CoinMarketCap' | 'CoinCarp' | 'Cache'

export interface CoinPrice {
  symbol: SupportedSymbol
  name: string
  priceUsd: number
  change24h: number | null
  freshness: QuoteFreshness
  source: QuoteSource
  updatedAt: string
}

export interface PricesPayload {
  prices: CoinPrice[]
  lastUpdated: string
  cacheAgeMs: number
  warning: string | null
}

export interface SourceSnapshot {
  symbol: SupportedSymbol
  priceUsd: number
  change24h: number | null
  freshness: Exclude<QuoteFreshness, 'cached'>
  source: Exclude<QuoteSource, 'Cache'>
  updatedAt: string
}
