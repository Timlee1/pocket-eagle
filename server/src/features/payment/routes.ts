import express, { type Router } from 'express';
import { addUser, verifyUser } from '@/middleware';
import {
  createCheckoutSession,
  createCustomerPortalSession,
} from './controllers/payment';
import { webhook } from './controllers/webhook';

const router: Router = express.Router();

router.route('/webhook').post(webhook);

router.use(verifyUser, addUser);
router.route('/createCheckoutSession').post(createCheckoutSession);
router.route('/createCustomerPortalSession').post(createCustomerPortalSession);

export default router;
