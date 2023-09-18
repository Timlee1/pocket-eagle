import { type Request, type Response, type NextFunction } from 'express';
import { AppError, HttpCode } from '../../../libraries/exceptions/AppError';

const test = (req: Request, res: Response): void => {
  try {
    // console.log(req.headers.authorization);
    if (req.headers.authorization === undefined) {
      res.status(401).json({ test: 'test' });
    } else {
      res.status(200).json({ test: 'test' });
    }
  } catch (error) {
    res.status(401).json({ test: 'test' });
  }
};

const promise = Promise.resolve('value');

const asyncTest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if ((await promise).length > 0) {
      // Do something
    }
    // throw new Error('test')
    throw new AppError({
      httpCode: HttpCode.UNAUTHORIZED,
      description: 'You must be logged in',
    });
  } catch (err) {
    next(err);
  }
};

export { test, asyncTest };
