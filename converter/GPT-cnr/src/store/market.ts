import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { PriceEntry, PricesResponse, SupportedSymbol } from '../types.js'

interface MarketState {
  amount: string
  error: string | null
  fetchPrices: (force?: boolean) => Promise<void>
  fromSymbol: SupportedSymbol
  isLoading: boolean
  isRefreshing: boolean
  lastUpdated: string | null
  prices: PriceEntry[]
  setAmount: (value: string) => void
  setFromSymbol: (value: SupportedSymbol) => void
  setToSymbol: (value: SupportedSymbol) => void
  swapSymbols: () => void
  toSymbol: SupportedSymbol
  warning: string | null
}

async function requestPrices(force = false): Promise<PricesResponse> {
  const query = force ? '?force=1' : ''
  const response = await fetch(`/api/prices${query}`, {
    headers: {
      accept: 'application/json',
    },
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null

    throw new Error(
      payload?.message ?? 'Unable to load prices from the backend scraper.',
    )
  }

  return response.json() as Promise<PricesResponse>
}

export const useMarketStore = create<MarketState>()(
  persist(
    (set, get) => ({
      amount: '100',
      error: null,
      async fetchPrices(force = false) {
        const hasExistingPrices = get().prices.length > 0

        set({
          error: null,
          isLoading: !hasExistingPrices,
          isRefreshing: hasExistingPrices,
        })

        try {
          const payload = await requestPrices(force)

          set({
            error: null,
            isLoading: false,
            isRefreshing: false,
            lastUpdated: payload.lastUpdated,
            prices: payload.prices,
            warning: payload.warning,
          })
        } catch (error) {
          set((state) => ({
            error:
              error instanceof Error
                ? error.message
                : 'Unexpected error while loading prices.',
            isLoading: false,
            isRefreshing: false,
            warning:
              state.prices.length > 0
                ? 'Using last known prices'
                : state.warning,
          }))
        }
      },
      fromSymbol: 'USDT',
      isLoading: true,
      isRefreshing: false,
      lastUpdated: null,
      prices: [],
      setAmount(value) {
        set({ amount: value })
      },
      setFromSymbol(value) {
        set({ fromSymbol: value })
      },
      setToSymbol(value) {
        set({ toSymbol: value })
      },
      swapSymbols() {
        set((state) => ({
          fromSymbol: state.toSymbol,
          toSymbol: state.fromSymbol,
        }))
      },
      toSymbol: 'BTC',
      warning: null,
    }),
    {
      name: 'crypto-converter-dashboard',
      partialize: (state) => ({
        fromSymbol: state.fromSymbol,
        toSymbol: state.toSymbol,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
