"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _ClientsModel = require('../Models/ClientsModel'); var _ClientsModel2 = _interopRequireDefault(_ClientsModel);

class ClientController {
  async index(req, res) {
    try {
      const clients = await _ClientsModel2.default.index(req.userId);
      return res.json(clients);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }

  async clientsInLine(req, res) {
    try {
      const clients = await _ClientsModel2.default.inLine(req.userId);
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
      const clients = await _ClientsModel2.default.patchInline(req.userId, req.params.id, req.body.emFila);
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
      const client = await _ClientsModel2.default.find(req.userId, req.params.id);
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
      const newClient = new (0, _ClientsModel2.default)(req.body);
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
      const client = new (0, _ClientsModel2.default)(req.body);
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

      await _ClientsModel2.default.delete(req.userId, req.params.id);

      return res.json(null);
    } catch (e) {
      return res.json([{
        error: 'unexpected error',
      }]);
    }
  }
}

exports. default = new ClientController();
