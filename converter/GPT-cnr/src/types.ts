export type SupportedSymbol =
  | 'BTC'
  | 'ETH'
  | 'USDT'
  | 'BNB'
  | 'SOL'
  | 'XRP'
  | 'ADA'
  | 'DOGE'
  | 'TON'
  | 'TRX'

export type QuoteFreshness = 'live' | 'fallback' | 'cached'
export type QuoteSource = 'CoinMarketCap' | 'CoinCarp' | 'Cache'

export interface PriceEntry {
  symbol: SupportedSymbol
  name: string
  priceUsd: number
  change24h: number | null
  freshness: QuoteFreshness
  source: QuoteSource
  updatedAt: string
}

export interface PricesResponse {
  prices: PriceEntry[]
  lastUpdated: string
  cacheAgeMs: number
  warning: string | null
}
