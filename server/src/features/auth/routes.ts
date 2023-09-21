import express, { type Router } from 'express';
import { addUser, verifyUser } from '@/middleware';
import { test, asyncTest } from './controllers/auth';

const router: Router = express.Router();

router.use(verifyUser, addUser);
router.route('/test').get(test);
router.route('/async').get(asyncTest);

export default router;
