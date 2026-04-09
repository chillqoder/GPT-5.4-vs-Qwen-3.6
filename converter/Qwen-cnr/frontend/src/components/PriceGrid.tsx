import { useStore, CryptoPrice } from '../store';

function PriceCard({ coin }: { coin: CryptoPrice }) {
  const formatPrice = (price: number) => {
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatChange = (change?: number) => {
    if (change === undefined) return '—';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getCoinIcon = (symbol: string) => {
    const icons: Record<string, string> = {
      BTC: '₿',
      ETH: 'Ξ',
      USDT: '₮',
      BNB: 'B',
      SOL: '◎',
      XRP: '✕',
      ADA: '₳',
      DOGE: 'Ð',
      TON: '◇',
      TRX: 'T',
    };
    return icons[symbol] || symbol[0];
  };

  return (
    <div className="bg-bgCard rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">
              {getCoinIcon(coin.symbol)}
            </span>
          </div>
          <div>
            <p className="text-white font-semibold">{coin.symbol}</p>
            <p className="text-xs text-gray-400">{coin.name}</p>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-2xl font-bold text-white">
          {formatPrice(coin.priceUSD)}
        </p>
        <p
          className={`text-sm mt-1 ${
            (coin.change24h ?? 0) >= 0 ? 'text-positive' : 'text-negative'
          }`}
        >
          {formatChange(coin.change24h)}
        </p>
      </div>
    </div>
  );
}

export function PriceGrid() {
  const { prices, isLoading } = useStore(state => ({
    prices: state.prices,
    isLoading: state.isLoading,
  }));

  if (isLoading && prices.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-bgCard rounded-xl p-6 border border-gray-800 animate-pulse-slow"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="h-4 w-16 bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-700 rounded" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-8 w-32 bg-gray-700 rounded" />
              <div className="h-4 w-20 bg-gray-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (prices.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400">No price data available</p>
        <p className="text-sm text-gray-500 mt-2">Click refresh to load prices</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {prices.map(coin => (
        <PriceCard key={coin.symbol} coin={coin} />
      ))}
    </div>
  );
}
