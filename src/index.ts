import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { getApplicationConfig } from './config/application.config';
import { startServer } from './server';

(async () => {
  // eslint-disable-next-line no-console
  console.clear();

  const config = getApplicationConfig();

  await createConnection();

  // Start the server
  await startServer(config);
})();
