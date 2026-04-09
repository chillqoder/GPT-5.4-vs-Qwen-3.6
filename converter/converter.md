# Crypto Converter Dashboard — AI Development Specification

---

## 1. Project Overview

Create a modern web application called **Crypto Converter Dashboard**.

The application must:

- Display live cryptocurrency prices
- Allow conversion between cryptocurrencies
- Work WITHOUT using any official APIs
- Automatically fetch real-time data from public web sources
- Always display current prices

The AI must independently obtain cryptocurrency prices from publicly available internet pages using web scraping.

---

## 2. Core Concept

User opens the web app and sees:

- Dashboard with cryptocurrency prices
- Converter between cryptocurrencies
- Automatically updating data

Example:

100 USDT → 0.0018 BTC

Prices must stay up-to-date automatically.

---

## 3. Supported Cryptocurrencies

The system must support exactly 10 cryptocurrencies:

1. BTC — Bitcoin  
2. ETH — Ethereum  
3. USDT — Tether (REQUIRED)  
4. BNB — Binance Coin  
5. SOL — Solana  
6. XRP — Ripple  
7. ADA — Cardano  
8. DOGE — Dogecoin  
9. TON — Toncoin  
10. TRX — TRON  

---

## 4. Technical Constraints

### Forbidden

- Official crypto APIs
- Paid APIs
- API keys
- Third-party crypto SDKs

### Allowed

- Public HTML parsing
- Server-side scraping
- Public webpages
- Cached data
- Scheduled fetching

---

## 5. Data Acquisition Strategy

AI must implement robust web scraping.

Possible public sources:

- CoinMarketCap public pages
- CoinGecko public pages
- Binance market pages
- TradingView public pages

AI must:

1. Fetch HTML pages.
2. Parse DOM elements containing prices.
3. Extract:
   - symbol
   - USD price
   - 24h change (optional)
4. Normalize all prices into USD.

---

## 6. Anti-Breaking Rules

Because page layouts may change:

- Implement multiple fallback sources.
- If source A fails → switch to source B.
- Validate extracted numbers.
- Ignore invalid values.
- Cache last successful prices.

---

## 7. Architecture

### Frontend

Use:

- React (Vite)
- TypeScript
- TailwindCSS
- Zustand for state management

### Backend (Required)

Use:

- Node.js
- Express.js

Backend responsibilities:

- Scraping
- Data normalization
- Caching
- Rate limiting

---

## 8. Data Flow

Internet Websites  
↓  
Scraper Service  
↓  
Price Normalizer  
↓  
Cache Storage  
↓  
Frontend Dashboard  

---

## 9. Update System

- Automatic refresh every 60 seconds
- Manual refresh button
- Background scheduled scraping

Caching rules:

- Store prices in memory cache
- Cache TTL: 60 seconds
- If scraping fails → return cached data

---

## 10. Conversion Logic

All conversions must use USD as a base currency.

Formula:

result = amount * (priceA / priceB)

Example:

BTC = 60000 USD  
USDT = 1 USD  

100 USDT → 100 / 60000 BTC

---

## 11. UI / UX Requirements

### Design Style

Modern fintech dashboard inspired by:

- Stripe
- Linear
- Coinbase
- Vercel

### Color Palette

Primary background: #0B0F19  
Card background: #111827  
Accent color: #3B82F6  
Positive change: #22C55E  
Negative change: #EF4444  
Text color: #E5E7EB  

---

## 12. Layout Structure

### Header

- Application logo
- Last update timestamp
- Refresh button

### Price Grid

Each card shows:

- Coin icon
- Symbol
- Price in USD
- Change percentage

### Converter Panel

Inputs:

- Amount
- From currency dropdown
- To currency dropdown

Output:

- Converted value (live update)

---

## 13. UX Behavior

- Instant conversion updates
- No page reloads
- Smooth transitions
- Loading skeletons during fetching
- Error fallback UI

---

## 14. Performance Requirements

- First load under 2 seconds
- Scraper timeout protection
- Prevent simultaneous scraping requests

---

## 15. Error Handling

If scraping fails:

1. Show cached prices.
2. Display warning:

"Using last known prices"

---

## 16. Security Rules

- Scraping logic must stay backend-only.
- Frontend cannot access external sources directly.
- Sanitize parsed HTML content.

---

## 17. Optional Enhancements

If AI is capable, implement:

- Mini price history charts
- Dark/light mode toggle
- LocalStorage for last selected currencies
- Trending coin highlight

---

## 18. Final Goal

Deliver a production-ready web application where:

- Users see live crypto prices
- Can convert between cryptocurrencies
- Data stays current
- No APIs are used
- System remains stable despite source layout changes

---