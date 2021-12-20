"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _FramesController = require('../Controllers/FramesController'); var _FramesController2 = _interopRequireDefault(_FramesController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _FramesController2.default.index);
router.get('/:id', _loginRequired2.default, _FramesController2.default.show);
router.post('/new-frame', _loginRequired2.default, _FramesController2.default.store);
router.put('/:id', _loginRequired2.default, _FramesController2.default.update);
router.delete('/:id', _loginRequired2.default, _FramesController2.default.delete);

exports. default = router;
