import express, { type Router } from 'express';
import * as auth from './controllers/auth';
import { verifyUser } from '../../middleware/verifyUser';

const router: Router = express.Router();

router.use(verifyUser);
router.route('/test').get(auth.test);
router.route('/async').get(auth.asyncTest);

export default router;
