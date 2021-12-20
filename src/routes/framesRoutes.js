import { Router } from 'express';
import framesController from '../Controllers/FramesController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, framesController.index);
router.get('/:id', loginRequired, framesController.show);
router.post('/new-frame', loginRequired, framesController.store);
router.put('/:id', loginRequired, framesController.update);
router.delete('/:id', loginRequired, framesController.delete);

export default router;
