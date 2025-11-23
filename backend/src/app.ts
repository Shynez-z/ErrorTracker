import express from 'express';
import { useContainer, useExpressServer, getMetadataArgsStorage } from 'routing-controllers';
import { Container } from 'typedi';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { config } from './config/config.js';
import { TestController } from './modules/test/test.controller.js';
import { ErrorHandler } from './common/middlewares/error-handler.middleware.js';
import { LoggerMiddleware } from './common/middlewares/logger.middleware.js';

// Use TypeDI container for dependency injection
useContainer(Container);

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions: cors.CorsOptions = {
  origin: config.cors.origin,
  credentials: true,
};
app.use(cors(corsOptions));

// Setup routing-controllers
useExpressServer(app, {
  controllers: [TestController],
  middlewares: [LoggerMiddleware, ErrorHandler],
  routePrefix: config.api.routePrefix,
  validation: true, // Enable class-validator validation
  classTransformer: true,
  defaultErrorHandler: false, // Use custom error handler
});

// Generate Swagger spec AFTER controllers are registered
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const swaggerSpec = routingControllersToSpec(
  getMetadataArgsStorage(),
  {
    routePrefix: config.api.routePrefix,
  },
  {
    info: {
      title: 'ErrorTracker API',
      version: '1.0.0',
      description: 'API documentation for ErrorTracker backend',
    },
    components: {
      schemas,
    },
  }
);

// Swagger documentation
if (config.api.swaggerRoute) {
  app.use(config.api.swaggerRoute, swaggerUi.serve);
  app.get(config.api.swaggerRoute, swaggerUi.setup(swaggerSpec));
}

export default app;
