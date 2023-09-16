import { type Request, type Response, type NextFunction } from 'express'
import { AppError, HttpCode } from '../../../libraries/exceptions/AppError'

const test = (req: Request, res: Response): void => {
  res.json('TESTING')
}

const promise = Promise.resolve('value')

const asyncTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if ((await promise).length > 0) {
      // Do something
    }
    // throw new Error('test')
    throw new AppError({ httpCode: HttpCode.UNAUTHORIZED, description: 'You must be logged in' })
  } catch (err) {
    next(err)
  }
}

export { test, asyncTest }
