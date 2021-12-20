"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ClientsController = require('../Controllers/ClientsController'); var _ClientsController2 = _interopRequireDefault(_ClientsController);

var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/new-client', _loginRequired2.default, _ClientsController2.default.store);
router.get('/inline', _loginRequired2.default, _ClientsController2.default.clientsInLine);
router.get('/', _loginRequired2.default, _ClientsController2.default.index);
router.get('/:id', _loginRequired2.default, _ClientsController2.default.show);
router.delete('/:id', _loginRequired2.default, _ClientsController2.default.delete);
router.put('/:id', _loginRequired2.default, _ClientsController2.default.update);
router.patch('/:id/inline', _loginRequired2.default, _ClientsController2.default.patchInline);

exports. default = router;
