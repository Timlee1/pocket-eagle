import { type NextFunction, type Response } from 'express';
import db from '@/config/db';
import { type IRequest } from '@/libraries/types';

const addUser: (
  req: IRequest,
  res: Response,
  next: NextFunction
) => Promise<void> = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const firebaseUid = req.firebaseUid;
    const { rows } = await db.query(
      'SELECT id FROM customer WHERE firebase_uid = $1',
      [firebaseUid]
    );
    if (rows.length === 0) {
      await db.query('INSERT INTO customer(firebase_uid) VALUES($1)', [
        firebaseUid,
      ]);
    }
    next();
  } catch (err) {
    next(err);
  }
};

export { addUser };
