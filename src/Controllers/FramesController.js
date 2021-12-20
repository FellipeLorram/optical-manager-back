import Frames from '../Models/FramesModel';

class FramesController {
  async index(req, res) {
    try {
      const frames = await Frames.index(req.userId);
      return res.json(frames[0]);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const frame = await Frames.find(req.userId, req.params.id);
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
      const newFrame = new Frames(req.body);
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
      const frame = new Frames(req.body);
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

      await Frames.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new FramesController();
