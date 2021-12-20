"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _LevelController = require('../Controllers/LevelController'); var _LevelController2 = _interopRequireDefault(_LevelController);
var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/admin-level', _loginRequired2.default, _LevelController2.default.store);

exports. default = router;
