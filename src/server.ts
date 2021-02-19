import 'reflect-metadata';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { LOGGER } from './util/logger';
import { errorHandler } from './middleware/errorHandler.middleware';
import { HttpStatus } from './util/http-status';
import { ApplicationConfig } from './config/application.config';
import { router as pageRouter } from './routers/pages.router';
import { router as articleRouter } from './routers/article.router';

const startServer = async ({
  port,
}: ApplicationConfig): Promise<Express> => {
  const app: Express = express();

  // Setup auto-parse of 'application.json' bodies and cookies
  app.use(express.json());
  // server.use(cookieParser());

  // Setup body parser
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  // Setup Routers
  app.use('', pageRouter);
  app.use('/article', articleRouter);

  // ? Catch all errors
  app.use((req, res, next) => next(HttpStatus.NOT_FOUND));
  app.use(errorHandler);

  app.listen(port, () => {
    LOGGER.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  return app;
};

export { startServer };
