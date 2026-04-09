import cors from 'cors'
import express from 'express'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CACHE_TTL_MS, getMarketPrices, startBackgroundRefresh } from './price-service.js'

const app = express()
const port = Number(process.env.PORT ?? 8787)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const clientDistDir = path.resolve(__dirname, '../client')

app.set('trust proxy', 1)

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.use(
  '/api',
  rateLimit({
    windowMs: 60_000,
    max: 90,
    legacyHeaders: false,
    standardHeaders: true,
  }),
)

app.get('/api/health', (_request, response) => {
  response.json({
    cacheTtlMs: CACHE_TTL_MS,
    status: 'ok',
  })
})

app.get('/api/prices', async (request, response, next) => {
  try {
    const force =
      request.query.force === '1' || request.query.force === 'true'

    const payload = await getMarketPrices({ force })
    response.json(payload)
  } catch (error) {
    next(error)
  }
})

app.use(express.static(clientDistDir))

app.use(
  (error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    void _next
    console.error('[api:error]', error)
    response.status(503).json({
      message: 'Failed to fetch crypto prices from public sources.',
    })
  },
)

startBackgroundRefresh()

app.listen(port, () => {
  console.log(`Crypto Converter Dashboard server listening on http://localhost:${port}`)
})
