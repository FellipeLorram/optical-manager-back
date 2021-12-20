import Lens from '../Models/LensModel';

class LensController {
  async index(req, res) {
    try {
      const lens = await Lens.index(req.userId);
      return res.json(lens[0]);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const len = await Lens.find(req.userId, req.params.id);
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
      const len = await Lens.findMultifocals(req.userId);
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
      const len = await Lens.findSimpleVisions(req.userId);
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
      const newLen = new Lens(req.body);
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
      const len = new Lens(req.body);
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

      await Lens.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new LensController();
