# config.ts - Configuration Management

## Location
`src/config/config.ts`

## Purpose
Centralized configuration management for the entire application using environment variables with sensible defaults.

## Key Responsibilities
1. **Environment Loading** - Loads `.env` file using dotenv
2. **Type Definition** - Defines Config interface with all settings
3. **Defaults** - Provides sensible defaults for all values
4. **Single Source of Truth** - Centralized config object

## Configuration Object

```typescript
interface Config {
  port: number;                    // Server port
  nodeEnv: string;                 // Environment (development/production/test)
  postgres_db: string;             // Database name
  postgres_host: string;           // Database host
  postgres_password: string;       // Database password
  postgres_port: number;           // Database port
  postgres_user: string;           // Database user
  api_route_prefix: string;        // API route prefix
  swagger_route: string;           // Swagger documentation route
}
```

## Environment Variables

| Variable | Default | Type | Description |
|----------|---------|------|-------------|
| `PORT` | 3000 | number | Server port |
| `NODE_ENV` | development | string | Execution environment |
| `POSTGRES_DB` | '' | string | PostgreSQL database name |
| `POSTGRES_HOST` | '' | string | PostgreSQL host |
| `POSTGRES_PASSWORD` | '' | string | PostgreSQL password |
| `POSTGRES_PORT` | 5432 | number | PostgreSQL port |
| `POSTGRES_USER` | '' | string | PostgreSQL user |
| `API_ROUTE_PREFIX` | /api/v1 | string | API prefix for routes |
| `SWAGGER_ROUTE` | /swagger | string | Swagger UI endpoint |

## .env File Example

```env
PORT=3000
NODE_ENV=development
POSTGRES_DB=errortracker
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=secretpassword
API_ROUTE_PREFIX=/api/v1
SWAGGER_ROUTE=/swagger
```

## Usage

### Import Config
```typescript
import config from './config/config.js';

console.log(config.port);           // 3000
console.log(config.postgres_db);    // errortracker
```

### In app.ts
```typescript
if (config.swagger_route) {
  app.use(config.swagger_route, swaggerUi.serve);
}
```

## Key Features
- ✅ Type-safe configuration
- ✅ Environment-based overrides
- ✅ Sensible defaults for development
- ✅ Single export point for configuration

## Important Notes
- ⚠️ `.env` file required for production settings
- ⚠️ Missing env vars fall back to defaults
- ⚠️ Empty string defaults should be populated in `.env`
- ✅ Number type coercion: `Number(process.env.PORT)`

## Dependencies
- `dotenv` - Environment variable loading

## Related Files
- `index.ts` - Uses config.port
- `app.ts` - Uses config.swagger_route
- `database/mikro-orm.config.ts` - Uses postgres_* variables
