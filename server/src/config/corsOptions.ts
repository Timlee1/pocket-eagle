import 'dotenv/config';
import { type CorsOptions } from 'cors';
import { AppError, HttpCode } from '../libraries/exceptions/AppError';

const allowedOrigins: string[] = process.env.ALLOWED_ORIGINS?.split(',') ?? [];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (
      process.env.NODE_ENV === 'development' &&
      (origin === undefined || allowedOrigins.includes(origin))
    ) {
      callback(null, true);
    } else if (
      process.env.NODE_ENV === 'production' &&
      origin !== undefined &&
      allowedOrigins.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new AppError({
          httpCode: HttpCode.UNAUTHORIZED,
          description: 'CORS Origin Not Allowed',
        })
      );
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
