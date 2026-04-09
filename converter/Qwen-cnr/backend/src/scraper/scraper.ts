import axios from 'axios';
import { CryptoPrice, ScraperResult } from '../types';

const SUPPORTED_COINS = [
  { symbol: 'BTC', name: 'Bitcoin', id: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', id: 'ethereum' },
  { symbol: 'USDT', name: 'Tether', id: 'tether' },
  { symbol: 'BNB', name: 'Binance Coin', id: 'binancecoin' },
  { symbol: 'SOL', name: 'Solana', id: 'solana' },
  { symbol: 'XRP', name: 'Ripple', id: 'ripple' },
  { symbol: 'ADA', name: 'Cardano', id: 'cardano' },
  { symbol: 'DOGE', name: 'Dogecoin', id: 'dogecoin' },
  { symbol: 'TON', name: 'Toncoin', id: 'the-open-network' },
  { symbol: 'TRX', name: 'TRON', id: 'tron' },
];

const TIMEOUT_MS = 15000;

// Source A: CoinGecko public API-like endpoint (no official API key needed)
async function scrapeCoinGecko(): Promise<ScraperResult> {
  try {
    const coinIds = SUPPORTED_COINS.map(c => c.id).join(',');
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`;
    
    console.log('Fetching from CoinGecko...');
    const response = await axios.get(url, {
      timeout: TIMEOUT_MS,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    const prices: CryptoPrice[] = [];

    for (const coin of SUPPORTED_COINS) {
      const coinData = data[coin.id];
      if (coinData && coinData.usd) {
        prices.push({
          symbol: coin.symbol,
          name: coin.name,
          priceUSD: coinData.usd,
          change24h: coinData.usd_24h_change,
          lastUpdated: new Date(),
        });
      }
    }

    if (prices.length >= 8) {
      return { success: true, prices, source: 'CoinGecko' };
    }

    return { success: false, prices: [], source: 'CoinGecko', error: `Insufficient data: ${prices.length}/10 coins` };
  } catch (error: any) {
    console.error('CoinGecko error:', error.message);
    return { success: false, prices: [], source: 'CoinGecko', error: error.message };
  }
}

// Source B: CoinMarketCap public pages - using embedded data
async function scrapeCoinMarketCap(): Promise<ScraperResult> {
  try {
    console.log('Fetching from CoinMarketCap...');
    const response = await axios.get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing?start=1&limit=50&sortBy=market_cap&sortType=desc&convert=USD&cryptoType=all&cryptoRating=true&audited=false', {
      timeout: TIMEOUT_MS,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    const prices: CryptoPrice[] = [];

    if (data?.data?.cryptoCurrencyList) {
      const listings = data.data.cryptoCurrencyList;
      
      for (const coin of SUPPORTED_COINS) {
        const listing = listings.find((l: any) => l.symbol === coin.symbol);
        if (listing && listing.quote?.USD?.price) {
          prices.push({
            symbol: coin.symbol,
            name: coin.name,
            priceUSD: listing.quote.USD.price,
            change24h: listing.quote.USD?.percentChange24h,
            lastUpdated: new Date(),
          });
        }
      }
    }

    if (prices.length >= 8) {
      return { success: true, prices, source: 'CoinMarketCap' };
    }

    return { success: false, prices: [], source: 'CoinMarketCap', error: `Insufficient data: ${prices.length}/10 coins` };
  } catch (error: any) {
    console.error('CoinMarketCap error:', error.message);
    return { success: false, prices: [], source: 'CoinMarketCap', error: error.message };
  }
}

// Source C: Binance public ticker API
async function scrapeBinance(): Promise<ScraperResult> {
  try {
    console.log('Fetching from Binance...');
    const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr', {
      timeout: TIMEOUT_MS,
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = response.data;
    const prices: CryptoPrice[] = [];

    const binancePairs = {
      BTC: 'BTCUSDT',
      ETH: 'ETHUSDT',
      BNB: 'BNBUSDT',
      SOL: 'SOLUSDT',
      XRP: 'XRPUSDT',
      ADA: 'ADAUSDT',
      DOGE: 'DOGEUSDT',
      TON: 'TONUSDT',
      TRX: 'TRXUSDT',
    };

    // USDT price is always 1
    prices.push({
      symbol: 'USDT',
      name: 'Tether',
      priceUSD: 1.0,
      change24h: 0,
      lastUpdated: new Date(),
    });

    for (const [symbol, pair] of Object.entries(binancePairs)) {
      const ticker = data.find((t: any) => t.symbol === pair);
      if (ticker && ticker.lastPrice) {
        prices.push({
          symbol,
          name: SUPPORTED_COINS.find(c => c.symbol === symbol)?.name || symbol,
          priceUSD: parseFloat(ticker.lastPrice),
          change24h: parseFloat(ticker.priceChangePercent),
          lastUpdated: new Date(),
        });
      }
    }

    if (prices.length >= 8) {
      return { success: true, prices, source: 'Binance' };
    }

    return { success: false, prices: [], source: 'Binance', error: `Insufficient data: ${prices.length}/10 coins` };
  } catch (error: any) {
    console.error('Binance error:', error.message);
    return { success: false, prices: [], source: 'Binance', error: error.message };
  }
}

// Main scraper orchestrator with fallback
export async function scrapeAllPrices(): Promise<ScraperResult> {
  const sources = [
    scrapeCoinGecko,
    scrapeCoinMarketCap,
    scrapeBinance,
  ];

  for (const scraper of sources) {
    const result = await scraper();

    if (result.success && result.prices.length > 0) {
      console.log(`✓ Successfully scraped ${result.prices.length} prices from ${result.source}`);
      return result;
    }

    console.log(`✗ Failed to scrape from ${result.source}: ${result.error}`);
  }

  return {
    success: false,
    prices: [],
    source: 'all',
    error: 'All scraping sources failed',
  };
}
