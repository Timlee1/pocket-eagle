import 'dotenv/config'
import { type CorsOptions } from 'cors'

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') ?? []

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV === 'development' && (origin === undefined || allowedOrigins.includes(origin))) {
      callback(null, true)
    } else if (process.env.NODE_ENV === 'production' && (origin !== undefined && allowedOrigins.includes(origin))) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}
