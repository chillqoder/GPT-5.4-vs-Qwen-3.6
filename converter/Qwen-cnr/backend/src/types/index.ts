export interface CryptoPrice {
  symbol: string;
  name: string;
  priceUSD: number;
  change24h?: number;
  lastUpdated: Date;
}

export interface PriceCache {
  prices: Map<string, CryptoPrice>;
  lastSuccessfulUpdate: Date | null;
  isStale: boolean;
}

export interface ScraperResult {
  success: boolean;
  prices: CryptoPrice[];
  source: string;
  error?: string;
}
