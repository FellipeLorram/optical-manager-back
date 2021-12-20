"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _UserController = require('../Controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/novo-usuario', _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);

exports. default = router;
