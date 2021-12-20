"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _LensController = require('../Controllers/LensController'); var _LensController2 = _interopRequireDefault(_LensController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _LensController2.default.index);
router.get('/mult', _loginRequired2.default, _LensController2.default.getMultifocals);
router.get('/simple-vision', _loginRequired2.default, _LensController2.default.getSimpleVision);
router.get('/:id', _loginRequired2.default, _LensController2.default.show);
router.post('/new-len', _loginRequired2.default, _LensController2.default.store);
router.put('/:id', _loginRequired2.default, _LensController2.default.update);
router.delete('/:id', _loginRequired2.default, _LensController2.default.delete);

exports. default = router;
