"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SellsModel = require('../Models/SellsModel'); var _SellsModel2 = _interopRequireDefault(_SellsModel);

class SellsController {
  async index(req, res) {
    try {
      const clientsSells = await _SellsModel2.default.index(req.userId, req.params.id);
      return res.json(clientsSells);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getAllSells(req, res) {
    try {
      const Sells = await _SellsModel2.default.getAllSells(req.userId);
      return res.json(Sells);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getLastSells(req, res) {
    try {
      const lastSells = await _SellsModel2.default.LastSells(req.userId);
      return res.json(lastSells);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const sell = await _SellsModel2.default.find(req.userId, req.params.id, req.params.sellId);
      return res.json(sell);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newSell = new (0, _SellsModel2.default)(req.body);
      await newSell.register(req.userId, req.params.id);
      if (newSell.errors.length > 0) return res.json({
        errors: newSell.errors,
      });
      return res.json(newSell.sell);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id || !req.params.sellId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const sell = new (0, _SellsModel2.default)(req.body);
      await sell.findAndUpdate(req.userId, req.params.id, req.params.sellId);

      return res.json(sell.body);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id || req.param.sellId) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }

      await _SellsModel2.default.delete(req.userId, req.params.id, req.params.sellId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new SellsController();
