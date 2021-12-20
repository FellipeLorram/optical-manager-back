"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserModel = require('../Models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) return res.status(401).json({
      errors: ['Credenciais inválidas'],
    });

    const user = await _UserModel2.default.findByEmail(email);

    if (!user.length) {
      return res.status(401).json({
        errors: ['Usuario nao existe'],
      });
    }

    if (password !== user[0].password) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id } = user[0];

    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user[0].nome, id: user[0]._id, email: user[0].email } });
  }
}

exports. default = new TokenController();
