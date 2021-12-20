import { Router } from 'express';
import clientsController from '../Controllers/ClientsController';

import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.post('/new-client', loginRequired, clientsController.store);
router.get('/inline', loginRequired, clientsController.clientsInLine);
router.get('/', loginRequired, clientsController.index);
router.get('/:id', loginRequired, clientsController.show);
router.delete('/:id', loginRequired, clientsController.delete);
router.put('/:id', loginRequired, clientsController.update);
router.patch('/:id/inline', loginRequired, clientsController.patchInline);

export default router;
