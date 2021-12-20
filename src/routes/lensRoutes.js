import { Router } from 'express';
import lensController from '../Controllers/LensController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, lensController.index);
router.get('/mult', loginRequired, lensController.getMultifocals);
router.get('/simple-vision', loginRequired, lensController.getSimpleVision);
router.get('/:id', loginRequired, lensController.show);
router.post('/new-len', loginRequired, lensController.store);
router.put('/:id', loginRequired, lensController.update);
router.delete('/:id', loginRequired, lensController.delete);

export default router;
