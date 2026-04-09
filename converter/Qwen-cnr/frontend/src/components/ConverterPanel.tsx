import { useStore } from '../store';

const CURRENCIES = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDT', name: 'Tether' },
  { symbol: 'BNB', name: 'Binance Coin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOGE', name: 'Dogecoin' },
  { symbol: 'TON', name: 'Toncoin' },
  { symbol: 'TRX', name: 'TRON' },
];

export function ConverterPanel() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    prices,
    setFromCurrency,
    setToCurrency,
    setAmount,
    convert,
  } = useStore();

  const result = convert();

  const formatResult = (value: number | null, symbol: string) => {
    if (value === null) return '—';
    
    if (value >= 1) {
      return `${value.toLocaleString('en-US', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 6 
      })} ${symbol}`;
    } else {
      return `${value.toFixed(8)} ${symbol}`;
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="bg-bgCard rounded-xl p-8 border border-gray-800">
      <h2 className="text-2xl font-bold text-white mb-6">Converter</h2>

      <div className="space-y-6">
        {/* From */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">From</label>
          <div className="flex space-x-4">
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {CURRENCIES.map(coin => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.symbol} - {coin.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
              min="0"
              step="any"
            />
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="w-12 h-12 bg-accent hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
            title="Swap currencies"
          >
            <span className="text-white text-2xl">⇅</span>
          </button>
        </div>

        {/* To */}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">To</label>
          <div className="flex space-x-4">
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {CURRENCIES.map(coin => (
                <option key={coin.symbol} value={coin.symbol}>
                  {coin.symbol} - {coin.name}
                </option>
              ))}
            </select>
            <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3">
              <p className="text-white font-semibold">
                {formatResult(result, toCurrency)}
              </p>
            </div>
          </div>
        </div>

        {/* Rate Info */}
        {prices.length > 0 && (
          <div className="pt-4 border-t border-gray-800">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Exchange Rate</span>
              <span className="text-textPrimary">
                1 {fromCurrency} ={' '}
                {prices.find(p => p.symbol === fromCurrency)?.priceUSD && 
                 prices.find(p => p.symbol === toCurrency)?.priceUSD
                  ? (
                      prices.find(p => p.symbol === fromCurrency)!.priceUSD /
                      prices.find(p => p.symbol === toCurrency)!.priceUSD
                    ).toFixed(8)
                  : '—'}{' '}
                {toCurrency}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
