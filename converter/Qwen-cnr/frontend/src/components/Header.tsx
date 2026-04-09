import { useStore } from '../store';

export function Header() {
  const { lastUpdate, isStale, isLoading, fetchPrices } = useStore(state => ({
    lastUpdate: state.lastUpdate,
    isStale: state.isStale,
    isLoading: state.isLoading,
    fetchPrices: state.fetchPrices,
  }));

  const handleRefresh = async () => {
    await fetchPrices();
  };

  const formatLastUpdate = (dateStr: string | null) => {
    if (!dateStr) return 'No data yet';
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  return (
    <header className="bg-bgCard border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">₿</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Crypto Converter</h1>
              <p className="text-sm text-gray-400">Live Prices & Conversion</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-xs text-gray-400">Last Update</p>
              <p className="text-sm font-mono text-textPrimary">
                {formatLastUpdate(lastUpdate)}
              </p>
            </div>

            {isStale && (
              <div className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
                <p className="text-xs text-yellow-500">Using cached prices</p>
              </div>
            )}

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-accent hover:bg-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className={`text-lg ${isLoading ? 'animate-spin' : ''}`}>↻</span>
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
