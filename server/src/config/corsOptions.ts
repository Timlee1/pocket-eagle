import "dotenv/config"
import { CorsOptions } from 'cors'

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') || []

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV == 'development' && !origin || allowedOrigins?.includes(origin!)) {
      callback(null, true);
    } else if (process.env.NODE_ENV == 'production' || allowedOrigins?.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOptions