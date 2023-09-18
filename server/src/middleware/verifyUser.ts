import { type NextFunction, type Request, type Response } from 'express';
import { admin } from '../config/firebase';

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  // console.log(token);

  try {
    const decodeValue = await admin.auth().verifyIdToken(token);
    console.log(decodeValue);
    if (decodeValue) {
      return next();
    }
    return res.status(401).json({ message: 'Unauthorized' });
  } catch (error) {
    return res.json({ message: 'Internal Error' });
  }
};

export { verifyUser };
