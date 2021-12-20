import UserModel from './Schemma';

export default class Payments {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.payment = null;
  }

  static async find(userId, clientId, sellId) {
    const sells = await UserModel.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    const sell = sells.clients[0].sells
      .filter((sellToFind) => sellToFind._id.toString() === sellId);
    return sell[0].payment;
  }

  static async findOne(userId, clientId, sellId, paymentId) {
    const sells = await UserModel.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
    const sell = sells.clients[0].sells
      .filter((sellToFind) => sellToFind._id.toString() === sellId);
    return sell[0].payment
      .filter((paymentToFind) => paymentToFind._id.toString() === paymentId);
  }

  async register(userId, clientId, sellId) {
    this.payment = await UserModel.findByIdAndUpdate({ _id: userId }, {
      $push: {
        'clients.$[i].sells.$[j].payment': this.body,
      },
    },
    {
      arrayFilters: [
        {
          'i._id': clientId,
        },
        {
          'j._id': sellId,
        },
      ],
    });
  }

  async findAndUpdate(userId, clientId, sellId, paymentId) {
    await UserModel.updateOne({ _id: userId }, {
      $set: {
        'clients.$[i].sells.$[j].payment.$[k].value': this.body.value,
        'clients.$[i].sells.$[j].payment.$[k].type': this.body.type,
        'clients.$[i].sells.$[j].payment.$[k].receiveBy': this.body.receiveBy,
      },
    },
    {
      arrayFilters: [
        {
          'i._id': clientId,
        },
        {
          'j._id': sellId,
        },
        {
          'k._id': paymentId,
        },
      ],
    });
  }

  static async delete(userId, clientId, sellId, paymentId) {
    return await UserModel.updateOne({ _id: userId }, {
      $pull: {
        'clients.$[i].sells.$[j].payment': { _id: paymentId },
      },
    },
    {
      arrayFilters: [
        {
          'i._id': clientId,
        },
        {
          'j._id': sellId,
        },
      ],
    });
  }
}
/*
    return await UserModel.updateOne({
      _id: userId,
      clients: {
        $elemMatch: {
          _id: clientId,
        },
      },
    }, { $pull: { 'clients.$.sells': { _id: sellId } } });

*/
