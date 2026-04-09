export const SUPPORTED_COINS = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    coinMarketCapSlug: 'bitcoin',
    coinCarpSlug: 'bitcoin',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    coinMarketCapSlug: 'ethereum',
    coinCarpSlug: 'ethereum',
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    coinMarketCapSlug: 'tether',
    coinCarpSlug: 'tether',
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    coinMarketCapSlug: 'bnb',
    coinCarpSlug: 'bnb',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    coinMarketCapSlug: 'solana',
    coinCarpSlug: 'solana',
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    coinMarketCapSlug: 'xrp',
    coinCarpSlug: 'xrp',
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    coinMarketCapSlug: 'cardano',
    coinCarpSlug: 'cardano',
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    coinMarketCapSlug: 'dogecoin',
    coinCarpSlug: 'dogecoin',
  },
  {
    symbol: 'TON',
    name: 'Toncoin',
    coinMarketCapSlug: 'toncoin',
    coinCarpSlug: 'toncoin',
  },
  {
    symbol: 'TRX',
    name: 'TRON',
    coinMarketCapSlug: 'tron',
    coinCarpSlug: 'tron',
  },
] as const

export type CoinDefinition = (typeof SUPPORTED_COINS)[number]
export type SupportedSymbol = CoinDefinition['symbol']
