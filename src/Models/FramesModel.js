import UserModel from './Schemma';

export default class Frames {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.frame = null;
  }

  static async index(id) {
    return await UserModel.find({ _id: id }, { frames: 1, _id: 0 }).sort({ CriadoEm: -1 });
  }

  static async find(userId, frameId) {
    return await UserModel.findOne({ _id: userId, 'frames._id': frameId }, { 'frames.$': 1, _id: 0 });
  }

  async register(userId) {
    if (this.errors.length > 0) return;
    this.frame = await UserModel.findByIdAndUpdate({ _id: userId }, {
      $push: {
        frames: this.body,
      },
    });
  }

  async findAndUpdate(userId, frameId) {
    if (this.errors.lenght > 0) return;

    await UserModel.updateOne({ _id: userId, 'frames._id': frameId }, {
      $set: {
        'frames.$.name': this.body.name,
        'frames.$.ref': this.body.ref,
        'frames.$.price': this.body.price,
        'frames.$.sexo': this.body.sexo,
      },
    });
  }

  static async delete(userId, frameId) {
    return await UserModel.updateOne({ _id: userId }, { $pull: { frames: { _id: frameId } } });
  }
}
