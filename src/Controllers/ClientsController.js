import Client from '../Models/ClientsModel';

class ClientController {
  async index(req, res) {
    try {
      const clients = await Client.index(req.userId);
      return res.json(clients);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async clientsInLine(req, res) {
    try {
      const clients = await Client.inLine(req.userId);
      return res.json(clients);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async patchInline(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID inválido'],
        });
      }
      const clients = await Client.patchInline(req.userId, req.params.id, req.body.emFila);
      return res.json(clients);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async show(req, res) {
    try {
      const client = await Client.find(req.userId, req.params.id);
      if (!client) return res.json(null);
      return res.json(client.clients);
    } catch (e) {
      console.log(e);
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async store(req, res) {
    try {
      const newClient = new Client(req.body);
      await newClient.register(req.userId);
      if (newClient.errors.length > 0) return res.json({
        errors: newClient.errors,
      });
      return res.json(newClient.client);
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
      const client = new Client(req.body);
      await client.findAndUpdate(req.userId, req.params.id);
      return res.json(client.body);
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

      await Client.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

export default new ClientController();
