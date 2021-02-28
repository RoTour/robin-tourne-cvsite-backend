import 'reflect-metadata';
import { ConnectionOptions, createConnection, getConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { getApplicationConfig } from './config/application.config';
import { startServer } from './server';

dotenv.config();

const getOptions = async (production: boolean) => {
  let connectionOptions: ConnectionOptions;
  connectionOptions = {
    type: 'postgres',
    synchronize: true,
    logging: false,
    ssl: production && {
      rejectUnauthorized: false,
    },
    entities: [
      '**/models/**/*.entity.ts',
      '**/models/**/*.entity.js',
    ],
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

const connect2Database = async (production: boolean): Promise<void> => {
  const typeormConfig = await getOptions(production);
  await createConnection(typeormConfig);
};

(async () => {
  // eslint-disable-next-line no-console
  console.clear();

  const config = getApplicationConfig();

  // const typeormConfig = await getOptions();
  // await createConnection(typeormConfig);

  await connect2Database(config.production);

  // Start the server
  await startServer(config);
})();
