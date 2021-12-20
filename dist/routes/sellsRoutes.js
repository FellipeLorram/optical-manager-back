"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _SellsController = require('../Controllers/SellsController'); var _SellsController2 = _interopRequireDefault(_SellsController);
var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/sells/last', _loginRequired2.default, _SellsController2.default.getLastSells);
router.get('/sells/all', _loginRequired2.default, _SellsController2.default.getAllSells);
router.get('/:id/sells', _loginRequired2.default, _SellsController2.default.index);
router.get('/:id/sells/:sellId', _loginRequired2.default, _SellsController2.default.show);
router.post('/:id/new-sell', _loginRequired2.default, _SellsController2.default.store);
router.delete('/:id/:sellId', _loginRequired2.default, _SellsController2.default.delete);
router.put('/:id/:sellId', _loginRequired2.default, _SellsController2.default.update);

exports. default = router;
