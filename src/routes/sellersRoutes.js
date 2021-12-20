import { Router } from 'express';
import sellersController from '../Controllers/SellersController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, sellersController.index);
router.get('/names', loginRequired, sellersController.getSellersNames);

router.get('/:id', loginRequired, sellersController.show);

router.post('/new-seller', loginRequired, sellersController.store);

router.put('/:id', loginRequired, sellersController.update);
router.put('/:id', loginRequired, sellersController.update);

router.delete('/:id', loginRequired, sellersController.delete);

export default router;
