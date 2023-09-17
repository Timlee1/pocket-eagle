import express, { type Router } from 'express';
import * as auth from './controllers/auth';

const router: Router = express.Router();

router.route('/test').get(auth.test);
router.route('/async').get(auth.asyncTest);

export default router;
