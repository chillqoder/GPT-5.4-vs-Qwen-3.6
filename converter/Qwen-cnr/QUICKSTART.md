# Quick Start Guide

## The application is ready to use! 🚀

### Current Status
✅ **Backend** - Running on http://localhost:3001  
✅ **Frontend** - Running on http://localhost:3000  
✅ **Prices** - Successfully fetching live data from CoinGecko  
✅ **All 10 cryptocurrencies** - Active and updating every 60 seconds

### Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### Features Working

✅ Live cryptocurrency prices (auto-refresh every 60 seconds)  
✅ Manual refresh button in the header  
✅ Real-time currency conversion  
✅ All 10 supported cryptocurrencies:
   - BTC (Bitcoin) - $71,164
   - ETH (Ethereum) - $2,206
   - USDT (Tether) - $1.00
   - BNB (Binance Coin) - $604
   - SOL (Solana) - $83
   - XRP (Ripple) - $1.35
   - ADA (Cardano) - $0.25
   - DOGE (Dogecoin) - $0.09
   - TON (Toncoin) - $1.25
   - TRX (TRON) - $0.32

✅ Price conversion working (e.g., 100 USDT → 0.0014 BTC)  
✅ Modern dark theme fintech UI  
✅ Loading states and error handling

### Running the Application

The servers are currently running in the background. To restart them later:

**Terminal 1 - Backend:**
```bash
cd "Qwen-cnr/backend"
pnpm run dev
```

**Terminal 2 - Frontend:**
```bash
cd "Qwen-cnr/frontend"
pnpm run dev
```

### API Endpoints

Test the backend directly:

```bash
# Get all prices
curl http://localhost:3001/api/prices

# Convert currencies
curl "http://localhost:3001/api/convert?from=BTC&to=USDT&amount=1"

# Manual refresh
curl -X POST http://localhost:3001/api/refresh

# Health check
curl http://localhost:3001/api/health
```

### Stopping the Servers

When you're done, stop the background servers with:
```bash
pkill -f "pnpm run dev"
```

### Project Structure

```
Qwen-cnr/
├── backend/              # Node.js/Express backend
│   ├── src/
│   │   ├── cache/       # Price caching system
│   │   ├── scraper/     # Multi-source price scraper
│   │   ├── types/       # TypeScript types
│   │   └── index.ts     # Main server
│   └── package.json
├── frontend/            # React/Vite frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── store/       # Zustand state
│   │   └── App.tsx      # Main app
│   └── package.json
└── README.md           # Full documentation
```

### Data Sources

The application uses multiple fallback sources (in order):
1. **CoinGecko** (Primary) - ✓ Currently active
2. **CoinMarketCap** (Fallback A)
3. **Binance** (Fallback B)

If the primary source fails, it automatically switches to the next source.

### Next Steps

- Open http://localhost:3000 in your browser
- View live prices in the price grid
- Use the converter to convert between currencies
- Click refresh to manually update prices
- Prices update automatically every 60 seconds

Enjoy your Crypto Converter Dashboard! 🎉
