import Exams from '../Models/ExamsModel';

class ExamsController {
  async index(req, res) {
    try {
      const clientsExams = await Exams.index(req.userId, req.params.id);
      return res.json(clientsExams);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getLastExams(req, res) {
    try {
      const lastExams = await Exams.LastExams(req.userId);
      return res.json(lastExams);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getAllExams(req, res) {
    try {
      const exams = await Exams.getAllExams(req.userId);
      return res.json(exams);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getLastExam(req, res) {
    try {
      const lastExam = await Exams.findLastExam(req.userId, req.params.id);
      return res.json(lastExam);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const exam = await Exams.find(req.userId, req.params.id, req.params.examId);
      return res.json(exam);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newExam = new Exams(req.body);
      await newExam.register(req.userId, req.params.id);
      if (newExam.errors.length > 0) return res.json({
        errors: newExam.errors,
      });
      return res.json(newExam.body);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id || !req.params.examId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const exam = new Exams(req.body);
      await exam.findAndUpdate(req.userId, req.params.id, req.params.examId);

      return res.json(exam.body);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id || !req.params.examId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      await Exams.delete(req.userId, req.params.id, req.params.examId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new ExamsController();
