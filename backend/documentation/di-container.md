# di-container.ts - Dependency Injection Container

## Location
`src/di-container.ts`

## Purpose
Defines the global dependency injection container that stores and provides access to application singletons.

## Key Responsibilities
1. **Global Container** - Centralized access to singletons
2. **ORM Instance** - Stores MikroORM for database access
3. **Express Server** - Stores Express app instance
4. **Service Injection** - Makes instances available throughout the application

## Key Code

### DI Object Definition
```typescript
export const DI = {} as {
  orm: MikroORM;
  server: express.Express;
};
```
- Typed object for storing singletons
- `orm` - MikroORM database instance
- `server` - Express app instance

## Usage Pattern

### In Services
```typescript
import { DI } from '../di-container.js';

export class AppService {
  getOrm(): MikroORM {
    return DI.orm;
  }

  getEntityManager(): EntityManager {
    return DI.orm.em.fork();
  }
}
```

### Population (in index.ts)
```typescript
DI.orm = orm;
DI.server = app;
```

## Population Timing
- **When**: During server initialization in `index.ts`
- **After**: Database connection and Express setup complete
- **Before**: Server starts accepting requests

## Access Points
1. **Services** - Via TypeDI injection
2. **Controllers** - Injected as service dependency
3. **Middleware** - Via DI container

## Type Safety
- Full TypeScript typing for `orm` and `server`
- Compile-time type checking

## Important Notes
- ✅ Provides singleton pattern implementation
- ✅ Type-safe global access to key instances
- ⚠️ Must be populated before services are instantiated
- ⚠️ Should not be accessed before `index.ts` initialization

## Related Files
- `index.ts` - Populates DI container
- `services/app-service.ts` - Uses DI container
- `app.ts` - Depends on TypeDI Container
