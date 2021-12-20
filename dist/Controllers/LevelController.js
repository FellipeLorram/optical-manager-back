"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserModel = require('../Models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class LevelController {
  async store(req, res) {
    const { adminPassword } = req.body;

    if (!adminPassword) return res.status(401).json({
      errors: ['Credenciais inválidas'],
    });

    const user = await _UserModel2.default.findById(req.userId);

    if (user[0].adminPassword !== adminPassword) {
      return res.status(401).json({
        errors: ['Senha Inválida'],
      });
    }

    return res.json({
      level: 2,
      currentUserName: user[0].adminName,
    });
  }
}

exports. default = new LevelController();
