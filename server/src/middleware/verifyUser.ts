import { type NextFunction, type Response } from 'express';
import { admin } from '../config/firebase';
import { AppError, HttpCode } from '../libraries/exceptions/AppError';
import { type IRequest } from '../libraries/types';

type AuthValues = { uid: string } | undefined;

const verifyUser: (
  req: IRequest,
  res: Response,
  next: NextFunction
) => Promise<void> = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.headers?.authorization;
    if (authHeader === null || authHeader === undefined) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: 'Unable to authorize',
      });
    } else if (!authHeader.startsWith('Bearer ')) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: 'Unable to authorize',
      });
    }
    const token: string | undefined = authHeader.split(' ')[1];
    if (token === undefined || token === null) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: 'Unable to authorize',
      });
    }
    const decodedValues: AuthValues = await admin.auth().verifyIdToken(token);
    if (decodedValues === undefined || decodedValues === null) {
      throw new AppError({
        httpCode: HttpCode.UNAUTHORIZED,
        description: 'Unable to authorize',
      });
    } else {
      req.uid = decodedValues.uid;
      next();
    }
  } catch (err) {
    next(err);
  }
};

export { verifyUser };
