"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ConcertsModel = require('../Models/ConcertsModel'); var _ConcertsModel2 = _interopRequireDefault(_ConcertsModel);

class ConcertsController {
  async index(req, res) {
    try {
      const clientsConcerts = await _ConcertsModel2.default.index(req.userId, req.params.id);
      return res.json(clientsConcerts);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getAllRepairs(req, res) {
    try {
      const repairs = await _ConcertsModel2.default.getAllRepairs(req.userId);
      return res.json(repairs);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const concert = await _ConcertsModel2.default.find(req.userId, req.params.id, req.params.concertId);
      return res.json(concert);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newConcert = new (0, _ConcertsModel2.default)(req.body);
      await newConcert.register(req.userId, req.params.id);
      if (newConcert.errors.length > 0) return res.json({
        errors: newConcert.errors,
      });
      return res.json(newConcert.repair);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id || !req.params.concertId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const concert = new (0, _ConcertsModel2.default)(req.body);
      await concert.findAndUpdate(req.userId, req.params.id, req.params.concertId);

      return res.json(concert.body);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id || !req.params.concertId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      await _ConcertsModel2.default.delete(req.userId, req.params.id, req.params.concertId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new ConcertsController();
