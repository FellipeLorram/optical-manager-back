"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);
var _Schemma = require('./Schemma'); var _Schemma2 = _interopRequireDefault(_Schemma);

 class User {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async register() {
    this.validate();
    await this.userExists();

    if (this.errors.length > 0) return;
    this.user = await _Schemma2.default.create(this.body);
  }

  static async findByEmail(email) {
    return await _Schemma2.default.find({ email });
  }

  static async findById(userId) {
    return await _Schemma2.default.find({ _id: userId });
  }

  async userExists() {
    this.user = await _Schemma2.default.findOne({ email: this.body.email });
    if (this.user) this.errors.push('Usuário já existe.');
  }

  async findAndUpdate(id) {
    this.validate();

    if (this.errors.lenght > 0) return;

    await _Schemma2.default.findByIdAndUpdate(id, this.body, { new: true });
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
    if (!_validator2.default.isEmail(this.body.email)) this.errors.push('E-mail inváldo.');
    if (!this.body.password) this.errors.push('O campo senha é requerido');
  }
} exports.default = User;
