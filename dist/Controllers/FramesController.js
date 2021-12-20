"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _FramesModel = require('../Models/FramesModel'); var _FramesModel2 = _interopRequireDefault(_FramesModel);

class FramesController {
  async index(req, res) {
    try {
      const frames = await _FramesModel2.default.index(req.userId);
      return res.json(frames[0]);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const frame = await _FramesModel2.default.find(req.userId, req.params.id);
      if (!frame) return res.json(null);
      return res.json(frame.sellers);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newFrame = new (0, _FramesModel2.default)(req.body);
      await newFrame.register(req.userId);
      if (newFrame.errors.length > 0) return res.json({
        errors: newFrame.errors,
      });
      return res.json(newFrame.body);
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
      const frame = new (0, _FramesModel2.default)(req.body);
      await frame.findAndUpdate(req.userId, req.params.id);
      return res.json(frame.body);
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

      await _FramesModel2.default.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new FramesController();
