# Crypto Converter Dashboard

A modern web application that displays live cryptocurrency prices and allows conversion between cryptocurrencies — **without using any official APIs**. Data is fetched via web scraping from public sources.

## Features

- 🔄 Live cryptocurrency prices (auto-updates every 60 seconds)
- 💱 Real-time conversion between 10 cryptocurrencies
- 🎨 Modern fintech dashboard design (dark theme)
- 📡 Web scraping from multiple fallback sources
- 💾 Intelligent caching system
- ⚡ Fast and responsive UI

## Supported Cryptocurrencies

1. **BTC** — Bitcoin
2. **ETH** — Ethereum
3. **USDT** — Tether
4. **BNB** — Binance Coin
5. **SOL** — Solana
6. **XRP** — Ripple
7. **ADA** — Cardano
8. **DOGE** — Dogecoin
9. **TON** — Toncoin
10. **TRX** — TRON

## Tech Stack

### Backend
- Node.js + Express.js
- TypeScript
- Cheerio (HTML parsing)
- Axios (HTTP requests)
- In-memory caching

### Frontend
- React 18 + Vite
- TypeScript
- TailwindCSS
- Zustand (state management)

## Architecture

```
Internet Websites (CoinGecko, CoinMarketCap, Binance)
         ↓
    Scraper Service (with fallbacks)
         ↓
    Price Normalizer
         ↓
    Cache Storage (60s TTL)
         ↓
    REST API
         ↓
    Frontend Dashboard
```

## Setup Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

**Important:** Due to npm cache permission issues on your system, you may need to run this first:
```bash
sudo chown -R $(id -u):$(id -g) "~/.npm-cache"
```

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on `http://localhost:3001`

#### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. View live cryptocurrency prices in the price grid
3. Use the converter panel to convert between currencies
4. Prices auto-refresh every 60 seconds
5. Click the "Refresh" button for manual refresh

## API Endpoints

### Backend API (localhost:3001)

- `GET /api/prices` — Get current cached prices
- `GET /api/convert?from=BTC&to=USDT&amount=1` — Convert between currencies
- `POST /api/refresh` — Manually trigger price refresh
- `GET /api/health` — Health check endpoint

## Data Sources

The scraper uses multiple fallback sources in order:
1. **CoinGecko** (Primary)
2. **CoinMarketCap** (Fallback A)
3. **Binance** (Fallback B)

If a source fails or returns insufficient data, the system automatically tries the next source.

## Caching Strategy

- Cache TTL: 60 seconds
- If scraping fails, cached data is returned
- Frontend shows "Using cached prices" warning when data is stale
- Prevents simultaneous scraping requests (30s cooldown)

## Error Handling

- Multiple fallback scraping sources
- Price validation (ignores invalid values)
- Graceful degradation to cached data
- Loading skeletons during initial fetch
- Error messages in UI when data unavailable

## Project Structure

```
Qwen-cnr/
├── backend/
│   ├── src/
│   │   ├── cache/
│   │   │   └── priceCache.ts      # In-memory cache system
│   │   ├── scraper/
│   │   │   └── scraper.ts         # Multi-source web scraper
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   └── index.ts               # Express server + API routes
│   ├── package.json
│   └── tsconfig.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Header.tsx         # App header with refresh
    │   │   ├── PriceGrid.tsx      # Crypto price cards
    │   │   └── ConverterPanel.tsx # Currency converter
    │   ├── store/
    │   │   └── index.ts           # Zustand state management
    │   ├── App.tsx                # Main app component
    │   ├── main.tsx               # Entry point
    │   └── index.css              # TailwindCSS + custom styles
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    └── tsconfig.json
```

## Design

Color palette:
- Primary background: `#0B0F19`
- Card background: `#111827`
- Accent color: `#3B82F6`
- Positive change: `#22C55E`
- Negative change: `#EF4444`
- Text color: `#E5E7EB`

## License

MIT
