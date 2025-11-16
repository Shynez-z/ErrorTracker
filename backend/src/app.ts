import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import path from 'path';
import { TestController } from './controllers/testController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSchema from './initializers/swagger.js';
import config from './config/config.js';

//import itemRoutes from './routes/itemRoutes';
//import { errorHandler } from './middlewares/errorHandler';
useContainer(Container);
let app = express();

//app.use(express.json());
app = useExpressServer(app, {
  controllers: [TestController],
  routePrefix: '/api/v1',
});

if (config.swagger_route) {
  app.use(config.swagger_route, swaggerUi.serve);
  app.get(config.swagger_route, swaggerUi.setup(swaggerSchema));
}
// Routes
//app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;
