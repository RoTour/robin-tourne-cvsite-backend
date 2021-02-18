import "reflect-metadata";
import { getApplicationConfig } from "./config/application.config";
import { startServer } from "./server";
import { createConnection } from "typeorm";
import { LOGGER } from "./util/logger";

(async () => {
  // eslint-disable-next-line no-console
  console.clear();

  const config = getApplicationConfig();

  await createConnection();

  // Start the server
  const app = await startServer(config);
})();
