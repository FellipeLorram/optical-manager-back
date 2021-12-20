import { Router } from 'express';
import levelController from '../Controllers/LevelController';
import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.post('/admin-level', loginRequired, levelController.store);

export default router;
