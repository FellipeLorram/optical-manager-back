"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

const router = new (0, _express.Router)();

router.get('/', (req, res) => res.json('index'));

exports. default = router;
