import { Router } from 'express';
import examsController from '../Controllers/ExamsController';
import loginRequired from '../Middlewares/loginRequired';

const router = new Router();

router.get('/:id/exams', loginRequired, examsController.index);
router.get('/exams/last', loginRequired, examsController.getLastExams);
router.get('/exams/All', loginRequired, examsController.getAllExams);
router.get('/:id/exams/:examId', loginRequired, examsController.show);
router.get('/:id/lastexam', loginRequired, examsController.getLastExam);

router.post('/:id/new-exam', loginRequired, examsController.store);
router.delete('/:id/exams/:examId', loginRequired, examsController.delete);
router.put('/:id/exams/:examId', loginRequired, examsController.update);

export default router;
