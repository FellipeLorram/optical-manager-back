"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _SellersModel = require('../Models/SellersModel'); var _SellersModel2 = _interopRequireDefault(_SellersModel);

class SellersController {
  async index(req, res) {
    try {
      const sellers = await _SellersModel2.default.index(req.userId);
      return res.json(sellers[0]);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const seller = await _SellersModel2.default.find(req.userId, req.params.id);
      if (!seller) return res.json(null);
      return res.json(seller.sellers);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newSeller = new (0, _SellersModel2.default)(req.body);
      await newSeller.register(req.userId);
      if (newSeller.errors.length > 0) return res.json({
        errors: newSeller.errors,
      });
      return res.json(newSeller.body);
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
      const seller = new (0, _SellersModel2.default)(req.body);
      await seller.findAndUpdate(req.userId, req.params.id);
      return res.json(seller.body);
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

      await _SellersModel2.default.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getSellersNames(req, res) {
    try {
      const sellersNames = await _SellersModel2.default.sellersNames(req.userId);
      return res.json(sellersNames);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new SellersController();
