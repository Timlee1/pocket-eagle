import { type Request } from 'express';

export interface IRequest extends Request {
  uid?: string;
}
