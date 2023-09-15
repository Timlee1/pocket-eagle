import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import http from 'http';
import cookieParser from "cookie-parser";
import cors from "cors";
import { createHttpTerminator } from 'http-terminator';
import corsOptions from "./config/corsOptions";
import './libraries/exceptions/process';
import { errorHandler } from './libraries/exceptions/ErrorHandler';
import users from './features/users/routes';
import pinoHTTP from 'pino-http'
import logger from './libraries/logger/logger'


const port = process.env.PORT || 3000;

const app: Express = express();

//change logger to only log some attributes
process.env.NODE_ENV === 'production' ? app.use(pinoHTTP({
  logger,
})) : app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`)
  next();
});

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({
  server,
});

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/users', users);

app.use((err: Error, req: Request, res: Response) => {
  errorHandler.handleError(err, res);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}/`)
});