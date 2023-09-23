import express, {
  type Express,
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import 'dotenv/config';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import pinoHTTP from 'pino-http';
// import logger from './libraries/logger/logger';
import { createHttpTerminator } from 'http-terminator';
import { errorHandler } from './libraries/exceptions/ErrorHandler';
import { corsOptions } from './config/corsOptions';
import './libraries/exceptions/process';
import { type AppError } from './libraries/exceptions/AppError';
import auth from '@/features/auth/routes';
import payment from '@/features/payment/routes';

const port = process.env.PORT ?? 3000;

const app: Express = express();

// app.use(
//   pinoHTTP({ logger }));

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });

app.use('/stripe', express.raw({ type: 'application/json' }), payment);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/auth', auth);

app.use('/payment', payment);

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    errorHandler.handleError(err, res);
  }
);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
