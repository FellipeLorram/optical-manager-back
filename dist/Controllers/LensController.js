"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _LensModel = require('../Models/LensModel'); var _LensModel2 = _interopRequireDefault(_LensModel);

class LensController {
  async index(req, res) {
    try {
      const lens = await _LensModel2.default.index(req.userId);
      return res.json(lens[0]);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const len = await _LensModel2.default.find(req.userId, req.params.id);
      if (!len) return res.json(null);
      return res.json(len.sellers);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getMultifocals(req, res) {
    try {
      const len = await _LensModel2.default.findMultifocals(req.userId);
      if (!len) return res.json(null);
      return res.json(len);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getSimpleVision(req, res) {
    try {
      const len = await _LensModel2.default.findSimpleVisions(req.userId);
      if (!len) return res.json(null);
      return res.json(len);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newLen = new (0, _LensModel2.default)(req.body);
      await newLen.register(req.userId);
      if (newLen.errors.length > 0) return res.json({
        errors: newLen.errors,
      });
      return res.json(newLen.body);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const len = new (0, _LensModel2.default)(req.body);
      await len.findAndUpdate(req.userId, req.params.id);
      return res.json(len.body);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      await _LensModel2.default.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new LensController();
