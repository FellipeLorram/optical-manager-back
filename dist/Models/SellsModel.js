"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Sell {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.sell = null;
  }

  static async index(userId, clientId) {
    const user = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return user.clients[0].sells;
  }

  static async getAllSells(userId) {
    const response = await _Schemma2.default.findOne({ _id: userId }, {
      'clients.sells': 1, 'clients.nome': 1, 'clients._id': 1, _id: 0,
    }).sort({ 'sells.CriadoEm': -1 });

    let unformatSells = response.clients.filter((client) => client.sells.length > 0);
    unformatSells.forEach((clientSell) => {
      clientSell.sells.reverse();
    });

    unformatSells = unformatSells.map((unformatSell) => unformatSell.sells.map((s) => {
      const sellObj = { nome: unformatSell.nome, _id: unformatSell._id, sell: s };
      return sellObj;
    }));

    const Sells = [];

    unformatSells.forEach((sellArr) => sellArr.forEach((s) => Sells.push(s)));

    return Sells.sort((a, b) => b.sell.CriadoEm - a.sell.CriadoEm);
  }

  static async LastSells(userId) {
    const Sells = await Sell.getAllSells(userId);
    if (Sells.length > 6) return Sells.slice(0, 6);
    return Sells;
  }

  async register(userId, clientId) {
    if (this.errors.length > 0) return;
    await _Schemma2.default.updateOne({ _id: userId, 'clients._id': clientId }, {
      $push: {
        'clients.$.sells': this.body,
      },
    });
    const sells = await Sell.index(userId, clientId);
    const lastSell = sells.sort((a, b) => b.CriadoEm - a.CriadoEm)[0];
    this.sell = lastSell;
  }

  static async delete(userId, clientId, sellId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId,
        },
      },
    }, { $pull: { 'clients.$.sells': { _id: sellId } } });
  }

  static async find(userId, clientId, sellId) {
    const sells = await _Schemma2.default.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    return sells.clients[0].sells.filter((sell) => sell._id.toString() === sellId);
  }

  async findAndUpdate(userId, clientId, sellId) {
    return await _Schemma2.default.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId, 'sells._id': sellId,
        },
      },
    },
    {
      $set:
        {
          'clients.$.sells.$[inner].esfOd': this.body.esfOd,
          'clients.$.sells.$[inner].cilOd': this.body.cilOd,
          'clients.$.sells.$[inner].eixoOd': this.body.eixoOd,
          'clients.$.sells.$[inner].esfOe': this.body.esfOe,
          'clients.$.sells.$[inner].cilOe': this.body.cilOe,
          'clients.$.sells.$[inner].eixoOe': this.body.eixoOe,
          'clients.$.sells.$[inner].adicao': this.body.adicao,
          'clients.$.sells.$[inner].dnpOd': this.body.dnpOd,
          'clients.$.sells.$[inner].alturaOd': this.body.alturaOd,
          'clients.$.sells.$[inner].armacao': this.body.armacao,
          'clients.$.sells.$[inner].valorArm': this.body.valorArm,
          'clients.$.sells.$[inner].lente': this.body.lente,
          'clients.$.sells.$[inner].valorLen': this.body.valorLen,
          'clients.$.sells.$[inner].lenteContato': this.body.lenteContato,
          'clients.$.sells.$[inner].valorLenContato': this.body.valorLenContato,
          'clients.$.sells.$[inner].total': this.body.total,
          'clients.$.sells.$[inner].formaPagamento': this.body.formaPagamento,
          'clients.$.sells.$[inner].valorDin': this.body.valorDin,
          'clients.$.sells.$[inner].valorCar': this.body.valorCar,
          'clients.$.sells.$[inner].pago': this.body.pago,
          'clients.$.sells.$[inner].entregue': this.body.entregue,
          'clients.$.sells.$[inner].resta': this.body.resta,
        },
    },
    {
      arrayFilters: [
        { 'inner._id': sellId },
      ],
    });
  }
} exports.default = Sell;
