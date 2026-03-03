import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();

const configSchema = z.object({
  port: z.coerce.number().default(8080),
  nodeEnv: z.enum(['development','production','test']).default('production'),

  database: z.object({
    url: z.string()
  }),

  api: z.object({
    routePrefix: z.string().default('/api/v1'),
    swaggerRoute: z.string().default('/swagger'),
  }),

  cors: z.object({
    origin: z.string().or(z.array(z.string())).default('*'),
  }),
});

const rawConfig = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,

  database: {
    url: process.env.DATABASE_URL,
  },

  api: {
    routePrefix: process.env.API_ROUTE_PREFIX,
    swaggerRoute: process.env.SWAGGER_ROUTE,
  },

  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
};

export const config = configSchema.parse(rawConfig);