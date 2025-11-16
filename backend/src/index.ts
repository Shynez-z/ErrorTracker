import { MikroORM } from '@mikro-orm/core';
import app from './app.js';
import config from './config/config.js';
import express from 'express';
import initDb from './database/mikro-orm.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSchema from './initializers/swagger.js';
import { DI } from './di-container.js';

// if (process.env.SWAGGER_ROUTE) {
//   app.use(`${process.env.SWAGGER_ROUTE}`, swaggerUi.serve);
//   app.get(`${process.env.SWAGGER_ROUTE}`, swaggerUi.setup(swaggerSchema));
// }

const port = parseInt(process.env.PORT ?? '3000');

export const init = (async () => {
  const orm = await initDb();
  app.listen(port);
  DI.orm = orm;
  DI.server = app;
})();