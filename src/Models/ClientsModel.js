import UserModel from './Schemma';

export default class Client {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.client = null;
  }

  static async index(id) {
    const clients = await UserModel.find(
      { _id: id }, { clients: 1, _id: 0 },
    ).sort({ CriadoEm: -1 });
    return clients[0].clients.reverse();
  }

  static async find(userId, clientId) {
    return await UserModel.findOne({ _id: userId, 'clients._id': clientId }, { 'clients.$': 1, _id: 0 });
  }

  static async inLine(userId) {
    const clients = await Client.index(userId);
    const clientsInLine = clients.filter((client) => client.emFila);
    return clientsInLine;
  }

  async register(userId) {
    if (this.errors.length > 0) return;
    this.client = await UserModel.findByIdAndUpdate({ _id: userId }, {
      $push: {
        clients: this.body,
      },
    });
    const newClient = await Client.index(userId);
    this.client = newClient.pop();
  }

  static async patchInline(userId, clientId, value) {
    await UserModel.updateOne({ _id: userId, 'clients._id': clientId }, {
      $set: {
        'clients.$.emFila': value,
      },
    });
  }

  async findAndUpdate(userId, clientId) {
    if (this.errors.lenght > 0) return;

    await UserModel.updateOne({ _id: userId, 'clients._id': clientId }, {
      $set: {
        'clients.$.nome': this.body.nome,
        'clients.$.idade': this.body.idade,
        'clients.$.cpf': this.body.cpf,
        'clients.$.endereço': this.body.endereço,
        'clients.$.telefone': this.body.telefone,
        'clients.$.observacoes': this.body.observacoes,
      },
    });
  }

  static async delete(userId, clientId) {
    return await UserModel.updateOne({ _id: userId }, { $pull: { clients: { _id: clientId } } });
  }

  validate() {
    if (Number.isNaN(this.body.idade)) this.errors.push('Idade invalida');
    if (!this.body.nome) this.errors.push('O campo nome é requerido');
  }
}
