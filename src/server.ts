import 'reflect-metadata';
import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jsonwebtoken, { VerifyErrors } from 'jsonwebtoken';
import { LOGGER } from './util/logger';
import { errorHandler } from './middleware/errorHandler.middleware';
import { HttpStatus } from './util/http-status';
import { ApplicationConfig } from './config/application.config';
import { router as pageRouter } from './routers/pages.router';
import { router as articleRouter } from './routers/article.router';
import { router as postRouter } from './routers/post.router';

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

  // Setup JWT
  app.use((req: any, res, next) => {
    LOGGER.log('called jwt setup');
    if (req.headers
      && req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'JWT') {
      LOGGER.log('first check ok');
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs',
        (err: VerifyErrors | null, decode: any) => {
          if (err) {
            req.user = undefined;
            next();
          } else {
            req.user = decode;
            next();
          }
        });
    } else {
      LOGGER.log(`first check NOT ok: ${req.headers.username}`);
      req.user = undefined;
      next();
    }
  });

  // Setup Routers
  app.use('', pageRouter);
  app.use('/article', articleRouter);
  app.use('/post', postRouter);

  // ? Catch all errors
  app.use((req, res, next) => next(HttpStatus.NOT_FOUND));
  app.use(errorHandler);
  app.listen(port, () => {
    LOGGER.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
  return app;
};

export { startServer };
