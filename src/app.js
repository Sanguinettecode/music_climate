import 'dotenv/config';
import express from 'express';
import Youch from 'youch';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import 'express-async-errors';
import morgan from 'morgan';
import sentryConfg from './config/sentry';
import routes from './routes';
import './database';
import accessLogStream from './middleware/Logger';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfg);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(morgan('combined', { stream: accessLogStream }));
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'internal server error' });
    });
  }
}

export default new App().server;
