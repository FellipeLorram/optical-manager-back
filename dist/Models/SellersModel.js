"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Seller {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.seller = null;
  }

  static async index(id) {
    return await _Schemma2.default.find({ _id: id }, { sellers: 1, _id: 0 }).sort({ CriadoEm: -1 });
  }

  static async sellersNames(id) {
    const response = await _Schemma2.default.find(
      { _id: id },
      {
        sellers: 1,
        _id: 0,
      },
    ).sort({ CriadoEm: -1 });

    return response[0].sellers.map((seller) => seller.nome);
  }

  static async find(userId, sellerId) {
    return await _Schemma2.default.findOne({ _id: userId, 'sellers._id': sellerId }, { 'sellers.$': 1, _id: 0 });
  }

  async register(userId) {
    if (this.errors.length > 0) return;
    this.seller = await _Schemma2.default.findByIdAndUpdate({ _id: userId }, {
      $push: {
        sellers: this.body,
      },
    });
  }

  async findAndUpdate(userId, sellerId) {
    if (this.errors.lenght > 0) return;

    await _Schemma2.default.updateOne({ _id: userId, 'sellers._id': sellerId }, {
      $set: {
        'sellers.$.nome': this.body.nome,
        'sellers.$.idade': this.body.idade,
        'sellers.$.cpf': this.body.cpf,
        'sellers.$.endereço': this.body.endereço,
        'sellers.$.telefone': this.body.telefone,
        'sellers.$.observacoes': this.body.observacoes,
      },
    });
  }

  static async delete(userId, sellerId) {
    return await _Schemma2.default.updateOne({ _id: userId }, { $pull: { sellers: { _id: sellerId } } });
  }

  validate() {
    if (Number.isNaN(this.body.idade)) this.errors.push('Idade invalida');
    if (!this.body.nome) this.errors.push('O campo nome é requerido');
  }
} exports.default = Seller;
