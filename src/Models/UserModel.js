import validator from 'validator';
import UserModel from './Schemma';

export default class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    await this.userExists();

    if (this.errors.length > 0) return;
    this.user = await UserModel.create(this.body);
  }

  static async findByEmail(email) {
    return await UserModel.find({ email });
  }

  static async findById(userId) {
    return await UserModel.find({ _id: userId });
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
  }

  async findAndUpdate(id) {
    this.validate();

    if (this.errors.lenght > 0) return;

    await UserModel.findByIdAndUpdate(id, this.body, { new: true });
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }
  }

  validate() {
    this.cleanUp();

    if (!this.body.nome) this.errors.push('O campo nome é requerido');
    if (!this.body.email) this.errors.push('O campo email é requerido');
    if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inváldo.');
    if (!this.body.password) this.errors.push('O campo senha é requerido');
  }
}
