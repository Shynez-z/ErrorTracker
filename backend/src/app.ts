import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import path from 'path';
import { TestController } from './controllers/testController.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSchema from './initializers/swagger.js';

//import itemRoutes from './routes/itemRoutes';
//import { errorHandler } from './middlewares/errorHandler';
useContainer(Container);
let app = express();

//app.use(express.json());
app = useExpressServer(app, {
  controllers: [TestController],
  routePrefix: '/api/v1',
});

if (process.env.SWAGGER_ROUTE) {
  app.use(process.env.SWAGGER_ROUTE, swaggerUi.serve);
  app.get(process.env.SWAGGER_ROUTE, swaggerUi.setup(swaggerSchema));
}
// Routes
//app.use('/api/items', itemRoutes);

// Global error handler (should be after routes)
//app.use(errorHandler);

export default app;
