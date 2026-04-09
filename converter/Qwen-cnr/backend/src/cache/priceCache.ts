import { CryptoPrice, PriceCache } from '../types';

const CACHE_TTL_MS = 60 * 1000; // 60 seconds

const cache: PriceCache = {
  prices: new Map(),
  lastSuccessfulUpdate: null,
  isStale: true,
};

export const priceCache = {
  getPrices: (): Map<string, CryptoPrice> => {
    return new Map(cache.prices);
  },

  setPrices: (prices: CryptoPrice[]): void => {
    for (const price of prices) {
      cache.prices.set(price.symbol, {
        ...price,
        lastUpdated: new Date(),
      });
    }
    cache.lastSuccessfulUpdate = new Date();
    cache.isStale = false;
  },

  getLastUpdate: (): Date | null => {
    return cache.lastSuccessfulUpdate;
  },

  isCacheStale: (): boolean => {
    if (!cache.lastSuccessfulUpdate) return true;
    const now = new Date().getTime();
    const lastUpdate = cache.lastSuccessfulUpdate.getTime();
    return now - lastUpdate > CACHE_TTL_MS * 2;
  },

  isUsingCachedData: (): boolean => {
    return cache.isStale;
  },

  clearCache: (): void => {
    cache.prices.clear();
    cache.lastSuccessfulUpdate = null;
    cache.isStale = true;
  },
};
