"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ExamsModel = require('../Models/ExamsModel'); var _ExamsModel2 = _interopRequireDefault(_ExamsModel);

class ExamsController {
  async index(req, res) {
    try {
      const clientsExams = await _ExamsModel2.default.index(req.userId, req.params.id);
      return res.json(clientsExams);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getLastExams(req, res) {
    try {
      const lastExams = await _ExamsModel2.default.LastExams(req.userId);
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
      const exams = await _ExamsModel2.default.getAllExams(req.userId);
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
      const lastExam = await _ExamsModel2.default.findLastExam(req.userId, req.params.id);
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
      const exam = await _ExamsModel2.default.find(req.userId, req.params.id, req.params.examId);
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
      const newExam = new (0, _ExamsModel2.default)(req.body);
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
      const exam = new (0, _ExamsModel2.default)(req.body);
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

      await _ExamsModel2.default.delete(req.userId, req.params.id, req.params.examId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new ExamsController();
