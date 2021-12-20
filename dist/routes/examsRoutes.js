"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _ExamsController = require('../Controllers/ExamsController'); var _ExamsController2 = _interopRequireDefault(_ExamsController);
var _loginRequired = require('../Middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/:id/exams', _loginRequired2.default, _ExamsController2.default.index);
router.get('/exams/last', _loginRequired2.default, _ExamsController2.default.getLastExams);
router.get('/exams/All', _loginRequired2.default, _ExamsController2.default.getAllExams);
router.get('/:id/exams/:examId', _loginRequired2.default, _ExamsController2.default.show);
router.get('/:id/lastexam', _loginRequired2.default, _ExamsController2.default.getLastExam);

router.post('/:id/new-exam', _loginRequired2.default, _ExamsController2.default.store);
router.delete('/:id/exams/:examId', _loginRequired2.default, _ExamsController2.default.delete);
router.put('/:id/exams/:examId', _loginRequired2.default, _ExamsController2.default.update);

exports. default = router;
