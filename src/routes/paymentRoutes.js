import { Router } from 'express';
import paymentsController from '../Controllers/PaymentsController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/:clientid/:sellid/:paymentid', loginRequired, paymentsController.show);
router.get('/:clientid/:sellid', loginRequired, paymentsController.index);
router.post('/add-payment/:clientid/:sellid', loginRequired, paymentsController.store);
router.put('/:clientid/:sellid/:paymentid', loginRequired, paymentsController.update);
router.delete('/:clientid/:sellid/:paymentid', loginRequired, paymentsController.delete);

export default router;
