"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class Frames {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.frame = null;
  }

  static async index(id) {
    return await _Schemma2.default.find({ _id: id }, { frames: 1, _id: 0 }).sort({ CriadoEm: -1 });
  }

  static async find(userId, frameId) {
    return await _Schemma2.default.findOne({ _id: userId, 'frames._id': frameId }, { 'frames.$': 1, _id: 0 });
  }

  async register(userId) {
    if (this.errors.length > 0) return;
    this.frame = await _Schemma2.default.findByIdAndUpdate({ _id: userId }, {
      $push: {
        frames: this.body,
      },
    });
  }

  async findAndUpdate(userId, frameId) {
    if (this.errors.lenght > 0) return;

    await _Schemma2.default.updateOne({ _id: userId, 'frames._id': frameId }, {
      $set: {
        'frames.$.name': this.body.name,
        'frames.$.ref': this.body.ref,
        'frames.$.price': this.body.price,
        'frames.$.sexo': this.body.sexo,
      },
    });
  }

  static async delete(userId, frameId) {
    return await _Schemma2.default.updateOne({ _id: userId }, { $pull: { frames: { _id: frameId } } });
  }
} exports.default = Frames;
