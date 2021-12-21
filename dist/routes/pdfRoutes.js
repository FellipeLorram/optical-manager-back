"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PdfController = require('../Controllers/PdfController'); var _PdfController2 = _interopRequireDefault(_PdfController);
var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _PdfController2.default.index);
router.get('/', _loginRequired2.default, _PdfController2.default.index);

exports. default = router;
