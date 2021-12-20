import { Router } from 'express';
import sellsController from '../Controllers/SellsController';
import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/sells/last', loginRequired, sellsController.getLastSells);
router.get('/sells/all', loginRequired, sellsController.getAllSells);
router.get('/:id/sells', loginRequired, sellsController.index);
router.get('/:id/sells/:sellId', loginRequired, sellsController.show);
router.post('/:id/new-sell', loginRequired, sellsController.store);
router.delete('/:id/:sellId', loginRequired, sellsController.delete);
router.put('/:id/:sellId', loginRequired, sellsController.update);

export default router;
