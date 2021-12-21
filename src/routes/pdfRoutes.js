import { Router } from 'express';
import pdfController from '../Controllers/PdfController';
import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, pdfController.index);
router.get('/', loginRequired, pdfController.index);

export default router;
