"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _connectmongo = require('connect-mongo'); var _connectmongo2 = _interopRequireDefault(_connectmongo);
var _expresssession = require('express-session'); var _expresssession2 = _interopRequireDefault(_expresssession);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);













var _routes = require('./routes');

require('dotenv').config();

const whiteList = [
  'https://gireh.girehgerenciamento.tech',
  'http://localhost:3000',
  'https://optical-manager.vercel.app',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    const sessionOptions = _expresssession2.default.call(void 0, {
      secret: 'asdfghjklç',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
      store: _connectmongo2.default.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    });

    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());
    this.app.use(sessionOptions);
    this.app.use(_cors2.default.call(void 0, corsOptions));
    this.app.use(_helmet2.default.call(void 0, ));
  }

  routes() {
    this.app.use('/', _routes.homeRoute);
    this.app.use('/frames', _routes.framesRoutes);
    this.app.use('/lens', _routes.lensRoutes);
    this.app.use('/users/', _routes.userRoutes);
    this.app.use('/tokens/', _routes.tokenRoutes);
    this.app.use('/level/', _routes.levelRoute);
    this.app.use('/sellers/', _routes.sellersRoutes);
    this.app.use('/clients/', _routes.clientsRoutes);
    this.app.use('/clients/', _routes.sellsRoutes);
    this.app.use('/clients/', _routes.examsRoutes);
    this.app.use('/clients/', _routes.concertsRoutes);
    this.app.use('/clients/payments/', _routes.paymentRoutes);
  }
}

exports. default = new App().app;
