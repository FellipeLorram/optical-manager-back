"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

require('dotenv').config();

_mongoose2.default.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    _app2.default.emit('Conectado');
  })
  .catch((e) => console.log(e));

_app2.default.on('Conectado', () => {
  _app2.default.listen(process.env.PORT);
});
