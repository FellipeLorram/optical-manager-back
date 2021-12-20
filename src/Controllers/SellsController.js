import Sell from '../Models/SellsModel';

class SellsController {
  async index(req, res) {
    try {
      const clientsSells = await Sell.index(req.userId, req.params.id);
      return res.json(clientsSells);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getAllSells(req, res) {
    try {
      const Sells = await Sell.getAllSells(req.userId);
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
      const lastSells = await Sell.LastSells(req.userId);
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
      const sell = await Sell.find(req.userId, req.params.id, req.params.sellId);
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
      const newSell = new Sell(req.body);
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
      const sell = new Sell(req.body);
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

      await Sell.delete(req.userId, req.params.id, req.params.sellId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new SellsController();
