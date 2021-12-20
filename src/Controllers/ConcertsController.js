import Concerts from '../Models/ConcertsModel';

class ConcertsController {
  async index(req, res) {
    try {
      const clientsConcerts = await Concerts.index(req.userId, req.params.id);
      return res.json(clientsConcerts);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async getAllRepairs(req, res) {
    try {
      const repairs = await Concerts.getAllRepairs(req.userId);
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
      const concert = await Concerts.find(req.userId, req.params.id, req.params.concertId);
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
      const newConcert = new Concerts(req.body);
      await newConcert.register(req.userId, req.params.id);
      if (newConcert.errors.length > 0) return res.json({
        errors: newConcert.errors,
      });
      return res.json(newConcert.body);
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
      const concert = new Concerts(req.body);
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

      await Concerts.delete(req.userId, req.params.id, req.params.concertId);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new ConcertsController();
