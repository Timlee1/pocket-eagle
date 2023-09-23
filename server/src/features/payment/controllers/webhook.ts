import { type NextFunction, type Response } from 'express';
import Stripe from 'stripe';
import db from '@/config/db';
import { type IRequest } from '@/libraries/types';
import { AppError, HttpCode } from '@/libraries/exceptions/AppError';

let stripe: Stripe | undefined;
if (process.env.STRIPE_PRIVATE_KEY != null) {
  stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY, {
    apiVersion: '2023-08-16',
  });
}

export const webhook = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (stripe == null) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Unable to Recieve Webhook',
    });
  }
  if (process.env.STRIPE_WEBHOOK_SECRET == null) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Unable to Recieve Webhook',
    });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers['stripe-signature'];

  if (sig == null) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Unable to Recieve Webhook',
    });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    throw new AppError({
      httpCode: HttpCode.INTERNAL_SERVER_ERROR,
      description: 'Unable to Recieve Webhook',
    });
  }

  const data: Stripe.Event.Data = event.data;
  const eventType: string = event.type;
  switch (eventType) {
    // case 'customer.created':
    // case 'customer.updated':
    case 'invoice.payment_succeeded':
    case 'invoice.paid':
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      try {
        const eventData = data.object as Stripe.Invoice;
        if (eventData?.subscription_details?.metadata?.firebaseUid == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        const firebaseUid = eventData.subscription_details.metadata.firebaseUid;
        const stripeId = eventData.customer;
        if (eventData?.lines?.data[0]?.plan?.id == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        if (eventData?.lines?.data[0]?.period?.end == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        const stripePlan = eventData.lines.data[0].plan.id;
        const stripePlanEnd = eventData.lines.data[0].period.end;
        await db.query(
          'UPDATE customer SET stripe_id = $2, stripe_plan = $3, stripe_plan_end = $4 WHERE firebase_uid = $1',
          [firebaseUid, stripeId, stripePlan, stripePlanEnd]
        );
        console.log(stripeId);
        res.sendStatus(200);
        break;
      } catch (err) {
        next(err);
      }
      break;
    case 'checkout.session.completed':
      // payment status is unpaid then void subsciption
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      try {
        const eventData = event.data.object as Stripe.Checkout.Session;
        if (eventData?.metadata?.firebaseUid == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        const firebaseUid = eventData.metadata.firebaseUid;
        const stripeId = eventData.customer;
        if (eventData.payment_status === 'unpaid') {
          await db.query(
            'UPDATE customer SET stripe_id = $2, stripe_plan = $3, stripe_plan_end = $4 WHERE firebaseUid = $1',
            [firebaseUid, stripeId, null, null]
          );
        }
        res.sendStatus(200);
      } catch (err) {
        next(err);
      }
      break;
    case 'customer.subscription.updated':
      try {
        const eventData = event.data.object as Stripe.Subscription;
        if (eventData.metadata.firebaseUid == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        const firebaseUid = eventData.metadata.firebaseUid;

        const stripeId = eventData.customer;
        if (eventData?.items?.data[0]?.plan?.id == null) {
          throw new AppError({
            httpCode: HttpCode.INTERNAL_SERVER_ERROR,
            description: 'Unable to Recieve Webhook',
          });
        }
        const stripePlan = eventData.items.data[0].plan.id;
        const stripePlanEnd = eventData.current_period_end;
        await db.query(
          'UPDATE customer SET stripe_id = $2, stripe_plan = $3, stripe_plan_end = $4 WHERE firebase_uid = $1',
          [firebaseUid, stripeId, stripePlan, stripePlanEnd]
        );
        console.log(stripeId);
        res.sendStatus(200);
      } catch (err) {
        next(err);
      }
      break;
    // case 'invoice.payment_failed':
    // The payment failed or the customer does not have a valid payment method.
    // The subscription becomes past_due. Notify your customer and send them to the
    // customer portal to update their payment information.
    // break;
    default:
      // Unhandled event type
      res.sendStatus(200);
  }
};
