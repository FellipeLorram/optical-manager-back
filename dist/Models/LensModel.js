"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Lens {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.len = null;
  }

  static async index(id) {
    return await _Schemma2.default.find({ _id: id }, { lens: 1, _id: 0 }).sort({ CriadoEm: -1 });
  }

  static async find(userId, lenId) {
    return await _Schemma2.default.findOne({ _id: userId, 'lens._id': lenId }, { 'lens.$': 1, _id: 0 });
  }

  static async findMultifocals(userId) {
    const lens = await Lens.index(userId);
    const mult = lens[0].lens.filter((l) => l.type === 'Multifocal');
    return mult;
  }

  static async findSimpleVisions(userId) {
    const lens = await Lens.index(userId);
    const simple = lens[0].lens.filter((l) => l.type === 'Visão simples');
    return simple;
  }

  async register(userId) {
    if (this.errors.length > 0) return;
    this.len = await _Schemma2.default.findByIdAndUpdate({ _id: userId }, {
      $push: {
        lens: this.body,
      },
    });
  }

  async findAndUpdate(userId, lenId) {
    if (this.errors.lenght > 0) return;

    await _Schemma2.default.updateOne({ _id: userId, 'lens._id': lenId }, {
      $set: {
        'lens.$.name': this.body.name,
        'lens.$.type': this.body.type,
        'lens.$.price': this.body.price,
      },
    });
  }

  static async delete(userId, lenId) {
    return await _Schemma2.default.updateOne({ _id: userId }, { $pull: { lens: { _id: lenId } } });
  }
} exports.default = Lens;
