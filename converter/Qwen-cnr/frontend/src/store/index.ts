import { create } from 'zustand';
import axios from 'axios';

export interface CryptoPrice {
  symbol: string;
  name: string;
  priceUSD: number;
  change24h?: number;
  lastUpdated: string;
}

interface AppState {
  prices: CryptoPrice[];
  lastUpdate: string | null;
  isStale: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Converter state
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  
  // Actions
  fetchPrices: () => Promise<void>;
  setFromCurrency: (symbol: string) => void;
  setToCurrency: (symbol: string) => void;
  setAmount: (amount: string) => void;
  convert: () => number | null;
}

const API_URL = '/api';

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  prices: [],
  lastUpdate: null,
  isStale: true,
  isLoading: false,
  error: null,
  fromCurrency: 'BTC',
  toCurrency: 'USDT',
  amount: '1',

  // Actions
  fetchPrices: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/prices`);
      set({
        prices: response.data.prices,
        lastUpdate: response.data.lastUpdate,
        isStale: response.data.isStale,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Failed to fetch prices',
      });
    }
  },

  setFromCurrency: (symbol) => set({ fromCurrency: symbol }),
  setToCurrency: (symbol) => set({ toCurrency: symbol }),
  setAmount: (amount) => set({ amount }),

  convert: () => {
    const { prices, fromCurrency, toCurrency, amount } = get();
    const fromPrice = prices.find(p => p.symbol === fromCurrency);
    const toPrice = prices.find(p => p.symbol === toCurrency);
    
    if (!fromPrice || !toPrice || !amount || isNaN(parseFloat(amount))) {
      return null;
    }

    const result = parseFloat(amount) * (fromPrice.priceUSD / toPrice.priceUSD);
    return result;
  },
}));
