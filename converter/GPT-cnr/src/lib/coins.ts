import type { SupportedSymbol } from '../types.js'

export const COIN_ORDER: SupportedSymbol[] = [
  'BTC',
  'ETH',
  'USDT',
  'BNB',
  'SOL',
  'XRP',
  'ADA',
  'DOGE',
  'TON',
  'TRX',
]

export const COIN_META: Record<
  SupportedSymbol,
  {
    accent: string
    mark: string
    name: string
    ringClass: string
    surfaceClass: string
  }
> = {
  BTC: {
    accent: '#f7931a',
    mark: 'BT',
    name: 'Bitcoin',
    ringClass: 'ring-amber-300/20',
    surfaceClass: 'from-amber-400/18 via-transparent to-transparent',
  },
  ETH: {
    accent: '#627eea',
    mark: 'ET',
    name: 'Ethereum',
    ringClass: 'ring-indigo-300/20',
    surfaceClass: 'from-indigo-400/18 via-transparent to-transparent',
  },
  USDT: {
    accent: '#26a17b',
    mark: 'US',
    name: 'Tether',
    ringClass: 'ring-emerald-300/20',
    surfaceClass: 'from-emerald-400/18 via-transparent to-transparent',
  },
  BNB: {
    accent: '#f3ba2f',
    mark: 'BN',
    name: 'Binance Coin',
    ringClass: 'ring-yellow-300/20',
    surfaceClass: 'from-yellow-300/18 via-transparent to-transparent',
  },
  SOL: {
    accent: '#14f195',
    mark: 'SO',
    name: 'Solana',
    ringClass: 'ring-teal-300/20',
    surfaceClass: 'from-teal-300/18 via-transparent to-transparent',
  },
  XRP: {
    accent: '#e2e8f0',
    mark: 'XR',
    name: 'Ripple',
    ringClass: 'ring-slate-200/20',
    surfaceClass: 'from-slate-300/16 via-transparent to-transparent',
  },
  ADA: {
    accent: '#3b82f6',
    mark: 'AD',
    name: 'Cardano',
    ringClass: 'ring-sky-300/20',
    surfaceClass: 'from-sky-300/18 via-transparent to-transparent',
  },
  DOGE: {
    accent: '#c2a633',
    mark: 'DG',
    name: 'Dogecoin',
    ringClass: 'ring-amber-200/20',
    surfaceClass: 'from-orange-300/18 via-transparent to-transparent',
  },
  TON: {
    accent: '#0098ea',
    mark: 'TN',
    name: 'Toncoin',
    ringClass: 'ring-cyan-300/20',
    surfaceClass: 'from-cyan-300/18 via-transparent to-transparent',
  },
  TRX: {
    accent: '#ef4444',
    mark: 'TR',
    name: 'TRON',
    ringClass: 'ring-rose-300/20',
    surfaceClass: 'from-rose-300/18 via-transparent to-transparent',
  },
}
