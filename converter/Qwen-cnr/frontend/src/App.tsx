import { useEffect } from 'react';
import { useStore } from './store';
import { Header } from './components/Header';
import { PriceGrid } from './components/PriceGrid';
import { ConverterPanel } from './components/ConverterPanel';

function App() {
  const fetchPrices = useStore(state => state.fetchPrices);

  useEffect(() => {
    // Initial fetch
    fetchPrices();

    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, [fetchPrices]);

  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PriceGrid />
        <div className="mt-8">
          <ConverterPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
