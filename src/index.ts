import 'reflect-metadata';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
import { getApplicationConfig } from './config/application.config';
import { startServer } from './server';

const getOptions = async () => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    entities: ['**/models/**/*.entity.ts', '**/models/**/*.entity.js'],
  };
  if (process.env.DATABASE_URL) {
    Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
  } else {
    // gets your default configuration
    // you could get a specific config by name getConnectionOptions('production')
    // or getConnectionOptions(process.env.NODE_ENV)
    connectionOptions = await getConnectionOptions();
  }

  return connectionOptions;
};

(async () => {
  // eslint-disable-next-line no-console
  console.clear();

  const config = getApplicationConfig();

  const typeormConfig = await getOptions();
  await createConnection(typeormConfig);

  // Start the server
  await startServer(config);
})();
