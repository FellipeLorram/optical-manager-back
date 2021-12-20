import { Router } from 'express';
import tokenController from '../Controllers/TokenController';

const router = new Router();

router.post('/', tokenController.store);

export default router;
