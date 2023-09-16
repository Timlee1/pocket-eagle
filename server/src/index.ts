import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import 'dotenv/config';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import pinoHTTP from 'pino-http';
import { createHttpTerminator } from 'http-terminator';
import { errorHandler } from './libraries/exceptions/ErrorHandler';
import { corsOptions } from './config/corsOptions';
import './libraries/exceptions/process';
import logger from './libraries/logger/logger';
import users from './features/users/routes';
import { type AppError } from './libraries/exceptions/AppError';

const port = process.env.PORT ?? 3000;

const app: Express = express();

app.use(
  pinoHTTP({ logger }));

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/users', users);

app.use((err: Error | AppError, req: Request, res: Response, next: NextFunction) => { // must include next parameter
  errorHandler.handleError(err, res);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`);
});
