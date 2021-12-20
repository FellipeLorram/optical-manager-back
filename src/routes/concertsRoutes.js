import { Router } from 'express';
import concertsController from '../Controllers/ConcertsController';
import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/:id/concerts', loginRequired, concertsController.index);
router.get('/concerts/all', loginRequired, concertsController.getAllRepairs);
router.get('/:id/concerts/:concertId', loginRequired, concertsController.show);
router.post('/:id/new-concert', loginRequired, concertsController.store);
router.delete('/:id/concerts/:concertId', loginRequired, concertsController.delete);
router.put('/:id/concerts/:concertId', loginRequired, concertsController.update);

export default router;
