import { type NextFunction, type Response } from 'express';
import Stripe from 'stripe';
import { type IRequest } from '@/libraries/types';
import { AppError, HttpCode } from '@/libraries/exceptions/AppError';
import db from '@/config/db';

let stripe: Stripe | undefined;
if (process.env.STRIPE_PRIVATE_KEY != null) {
  stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-08-16',
  });
}

export const createCheckoutSession = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const baseURL = process.env.CLIENT_BASE_URL;
    const { priceId } = req.body;
    const firebaseUid = req.firebaseUid;
    if (stripe == null) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Unable to Go to Checkout',
      });
    }
    if (firebaseUid == null) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Unable to Go to Checkout',
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseURL}/profile`,
      cancel_url: `${baseURL}/payment`,
      // automatic_tax: { enabled: true },
      // payment_intent_data: {
      //   metadata: {
      //     firebaseUid,
      //     test: 'Test',
      //   },
      // },
      subscription_data: {
        metadata: {
          firebaseUid,
        },
      },
      metadata: { firebaseUid },
    });
    res.status(201).json({ url: session.url }); // return this?
  } catch (err) {
    next(err);
  }
};

export const createCustomerPortalSession = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log('customer portal');
    const baseURL = process.env.CLIENT_BASE_URL;
    const { rows } = await db.query(
      'SELECT stripe_id FROM customer WHERE firebase_uid = $1',
      [req.firebaseUid]
    );
    if (rows.length === 0) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Unable to Create Customer Portal Session',
      });
    }

    const stripeId = rows[0].stripe_id;
    console.log(typeof stripeId);
    if (stripe == null) {
      throw new AppError({
        httpCode: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Unable to Create Customer Portal Session',
      });
    }
    console.log(`${baseURL}/profile`);
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeId,
      return_url: `${baseURL}/profile`,
      // customer: 'cus_OgkKGtuanXTAhJ',
      // return_url: 'http://localhost:5173/payment',
    });
    console.log('done');
    res.status(201).json({ url: session.url });
  } catch (err) {
    // next(err);
    res.status(404);
  }
};
