import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();

const configSchema = z.object({
  port: z.coerce.number().default(3000),
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  database: z.object({
    host: z.string().min(1, 'Database host is required'),
    port: z.coerce.number().default(5432),
    name: z.string().min(1, 'Database name is required'),
    user: z.string().min(1, 'Database user is required'),
    password: z.string().min(1, 'Database password is required'),
  }),
  api: z.object({
    routePrefix: z.string().default('/api/v1'),
    swaggerRoute: z.string().default('/swagger'),
  }),
  cors: z.object({
    origin: z.string().or(z.array(z.string())).default('http://localhost:4200'),
  }),
});

const rawConfig = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  api: {
    routePrefix: process.env.API_ROUTE_PREFIX,
    swaggerRoute: process.env.SWAGGER_ROUTE,
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
};

// Validate and parse config - will throw if validation fails
export const config = configSchema.parse(rawConfig);

// Type-safe config export
export type Config = z.infer<typeof configSchema>;