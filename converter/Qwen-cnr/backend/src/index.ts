import express, { Express } from 'express';
import cors from 'cors';
import { scrapeAllPrices } from './scraper/scraper';
import { priceCache } from './cache/priceCache';

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Track if scraping is in progress to prevent simultaneous requests
let isScraping = false;
let lastScrapeTime = 0;
const SCRAPE_COOLDOWN = 30000; // 30 seconds minimum between scrapes

// Scrape and update cache
async function updatePrices(): Promise<void> {
  if (isScraping) {
    console.log('Scraping already in progress, skipping');
    return;
  }

  const now = Date.now();
  if (now - lastScrapeTime < SCRAPE_COOLDOWN) {
    console.log('Scrape cooldown active, skipping');
    return;
  }

  isScraping = true;
  try {
    console.log('Starting price update...');
    const result = await scrapeAllPrices();

    if (result.success) {
      priceCache.setPrices(result.prices);
      console.log(`Price update successful: ${result.prices.length} coins from ${result.source}`);
    } else {
      console.log(`Price update failed: ${result.error}`);
    }

    lastScrapeTime = now;
  } catch (error) {
    console.error('Scraping error:', error);
  } finally {
    isScraping = false;
  }
}

// API Routes
app.get('/api/prices', (req, res) => {
  const prices = priceCache.getPrices();
  const lastUpdate = priceCache.getLastUpdate();
  const isStale = priceCache.isCacheStale();

  res.json({
    prices: Array.from(prices.values()),
    lastUpdate,
    isStale,
    success: prices.size > 0,
  });
});

app.get('/api/convert', (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res.status(400).json({
      error: 'Missing required parameters: from, to, amount',
    });
  }

  const prices = priceCache.getPrices();
  const fromPrice = prices.get((from as string).toUpperCase());
  const toPrice = prices.get((to as string).toUpperCase());

  if (!fromPrice || !toPrice) {
    return res.status(404).json({
      error: `Price data not available for ${from} or ${to}`,
    });
  }

  // Conversion formula: result = amount * (fromPriceUSD / toPriceUSD)
  const convertedAmount = parseFloat(amount as string) * (fromPrice.priceUSD / toPrice.priceUSD);

  res.json({
    from: fromPrice.symbol,
    to: toPrice.symbol,
    amount: parseFloat(amount as string),
    result: convertedAmount,
    rate: fromPrice.priceUSD / toPrice.priceUSD,
  });
});

app.post('/api/refresh', async (req, res) => {
  try {
    await updatePrices();
    const prices = priceCache.getPrices();
    const lastUpdate = priceCache.getLastUpdate();

    res.json({
      success: true,
      prices: Array.from(prices.values()),
      lastUpdate,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to refresh prices',
    });
  }
});

app.get('/api/health', (req, res) => {
  const prices = priceCache.getPrices();
  res.json({
    status: 'ok',
    coinsAvailable: prices.size,
    lastUpdate: priceCache.getLastUpdate(),
    uptime: process.uptime(),
  });
});

// Start server and initial scrape
app.listen(PORT, () => {
  console.log(`🚀 Crypto Converter Backend running on port ${PORT}`);
  console.log(`📊 Initial price scraping starting...`);
  updatePrices();

  // Auto-refresh every 60 seconds
  setInterval(() => {
    updatePrices();
  }, 60000);
});

export default app;
