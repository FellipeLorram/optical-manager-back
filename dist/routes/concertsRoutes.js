"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ConcertsController = require('../Controllers/ConcertsController'); var _ConcertsController2 = _interopRequireDefault(_ConcertsController);
var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/:id/concerts', _loginRequired2.default, _ConcertsController2.default.index);
router.get('/concerts/all', _loginRequired2.default, _ConcertsController2.default.getAllRepairs);
router.get('/:id/concerts/:concertId', _loginRequired2.default, _ConcertsController2.default.show);
router.post('/:id/new-concert', _loginRequired2.default, _ConcertsController2.default.store);
router.delete('/:id/concerts/:concertId', _loginRequired2.default, _ConcertsController2.default.delete);
router.put('/:id/concerts/:concertId', _loginRequired2.default, _ConcertsController2.default.update);

exports. default = router;
