import express, { Express, Request, Response, NextFunction, Router } from "express";
import { AppError, HttpCode } from '../../libraries/exceptions/AppError';
import logger from '../../libraries/logger/logger';

const router: Router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("TESTING");
});

router.get('/async', async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You must be logged in' });
  } catch (err) {
    next(err)
  }
});

router.get('/sync', async (req: Request, res: Response, next: NextFunction) => {
  throw new Error('test');
});

export default router;

