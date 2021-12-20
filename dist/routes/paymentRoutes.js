"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PaymentsController = require('../Controllers/PaymentsController'); var _PaymentsController2 = _interopRequireDefault(_PaymentsController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/:clientid/:sellid/:paymentid', _loginRequired2.default, _PaymentsController2.default.show);
router.get('/:clientid/:sellid', _loginRequired2.default, _PaymentsController2.default.index);
router.post('/add-payment/:clientid/:sellid', _loginRequired2.default, _PaymentsController2.default.store);
router.put('/:clientid/:sellid/:paymentid', _loginRequired2.default, _PaymentsController2.default.update);
router.delete('/:clientid/:sellid/:paymentid', _loginRequired2.default, _PaymentsController2.default.delete);

exports. default = router;
