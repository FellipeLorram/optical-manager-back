import { Router } from 'express';
import userController from '../Controllers/UserController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.post('/novo-usuario', userController.store);
router.put('/', loginRequired, userController.update);

export default router;
