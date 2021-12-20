"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserModel = require('../Models/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);

class UserController {
  async store(req, res) {
    try {
      const newUser = new (0, _UserModel2.default)(req.body);
      await newUser.register();
      if (newUser.errors.length > 0) return res.json({
        errors: newUser.errors,
      });
      return res.json(newUser.body);
    } catch (e) {
      console.log(e);
      return res.json({
        errors: ['O campo nome é requerido', 'O campo senha é requerido', 'O campo email é requerido'],
      });
    }
  }

  async update(req, res) {
    try {
      const user = new (0, _UserModel2.default)(req.body);
      await user.findAndUpdate(req.userId);
      return res.json(user.body);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: ['ID inválido'],
      });
    }
  }
}

exports. default = new UserController();
