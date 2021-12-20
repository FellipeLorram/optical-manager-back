"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Concerts {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.sell = null;
  }

  static async index(userId, clientId) {
    const user = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return user.clients[0].concerts;
  }

  static async getAllRepairs(userId) {
    const response = await _Schemma2.default.findOne({ _id: userId }, {
      'clients.concerts': 1, 'clients.nome': 1, 'clients._id': 1, _id: 0,
    });

    if (response.length < 1) return null;

    let unformatConcerts = response.clients.filter((client) => client.concerts.length > 0);

    unformatConcerts.forEach((clientRepair) => {
      clientRepair.concerts.reverse();
    });

    unformatConcerts = unformatConcerts.map((unformatRepair) => unformatRepair.concerts.map((s) => {
      const repairObj = { nome: unformatRepair.nome, _id: unformatRepair._id, repair: s };
      return repairObj;
    }));

    const repairs = [];

    unformatConcerts.forEach((repairArr) => repairArr.forEach((repair) => repairs.push(repair)));

    return repairs.sort((a, b) => b.repair.CriadoEm - a.repair.CriadoEm);
  }

  async register(userId, clientId) {
    if (this.errors.length > 0) return;
    this.note = await _Schemma2.default.updateOne({ _id: userId, 'clients._id': clientId }, {
      $push: {
        'clients.$.concerts': this.body,
      },
    });
  }

  static async delete(userId, clientId, concertId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId,
        },
      },
    }, { $pull: { 'clients.$.concerts': { _id: concertId } } });
  }

  static async find(userId, clientId, concertId) {
    const exams = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return exams.clients[0].concerts.filter((exam) => exam._id.toString() === concertId);
  }

  async findAndUpdate(userId, clientId, concertId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId, 'concerts._id': concertId,
        },
      },
    },
    {
      $set:
        {
          'clients.$.concerts.$[inner].tipo': this.body.tipo,
          'clients.$.concerts.$[inner].valor': this.body.valor,
          'clients.$.concerts.$[inner].pago': this.body.pago,
          'clients.$.concerts.$[inner].entregue': this.body.entregue,
        },
    },
    {
      arrayFilters: [
        { 'inner._id': concertId },
      ],
    });
  }
} exports.default = Concerts;
