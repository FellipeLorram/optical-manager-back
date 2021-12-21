import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import {
  clientsRoutes,
  concertsRoutes,
  examsRoutes,
  framesRoutes,
  homeRoute,
  lensRoutes,
  levelRoute,
  paymentRoutes,
  sellersRoutes,
  sellsRoutes,
  tokenRoutes,
  userRoutes,
} from './routes';

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
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    const sessionOptions = session({
      secret: 'asdfghjklç',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
      store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    });

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(sessionOptions);
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
  }

  routes() {
    this.app.use('/', homeRoute);
    this.app.use('/frames', framesRoutes);
    this.app.use('/lens', lensRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/level/', levelRoute);
    this.app.use('/sellers/', sellersRoutes);
    this.app.use('/clients/', clientsRoutes);
    this.app.use('/clients/', sellsRoutes);
    this.app.use('/clients/', examsRoutes);
    this.app.use('/clients/', concertsRoutes);
    this.app.use('/clients/payments/', paymentRoutes);
  }
}

export default new App().app;
