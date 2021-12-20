"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _SellersController = require('../Controllers/SellersController'); var _SellersController2 = _interopRequireDefault(_SellersController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _SellersController2.default.index);
router.get('/names', _loginRequired2.default, _SellersController2.default.getSellersNames);

router.get('/:id', _loginRequired2.default, _SellersController2.default.show);

router.post('/new-seller', _loginRequired2.default, _SellersController2.default.store);

router.put('/:id', _loginRequired2.default, _SellersController2.default.update);
router.put('/:id', _loginRequired2.default, _SellersController2.default.update);

router.delete('/:id', _loginRequired2.default, _SellersController2.default.delete);

exports. default = router;
