# services/app-service.ts - Business Logic Layer

## Location
`src/services/app-service.ts`

## Purpose
Provides centralized access to core application resources (ORM, EntityManager, Express server) for controllers and other services.

## Class Definition

```typescript
@Service()
export class AppService { ... }
```

- `@Service()` - TypeDI service marker
- Auto-registered in dependency injection container
- Injected into controllers and other services

## Methods

### getOrm()
```typescript
getOrm(): MikroORM {
  return DI.orm;
}
```

**Purpose**: Returns MikroORM instance

**Returns**: `MikroORM` - Database ORM

**Usage**:
```typescript
const orm = appService.getOrm();
const schema = orm.getSchemaGenerator();
```

**Use Cases**:
- Schema generation
- Migration management
- Connection info

---

### getEntityManager()
```typescript
getEntityManager(): EntityManager {
  return DI.orm.em.fork();
}
```

**Purpose**: Returns new EntityManager fork for database operations

**Returns**: `EntityManager` - Forked entity manager instance

**Key Feature**: `.fork()` creates isolated context for database operations

**Usage**:
```typescript
const em = appService.getEntityManager();
const repo = em.getRepository<Test>('Test');
const tests = await repo.findAll();
```

**Why Fork?**:
- Isolation between concurrent requests
- Independent identity maps
- Clean transaction handling
- Prevents context pollution

---

### getServer()
```typescript
getServer(): express.Express {
  return DI.server;
}
```

**Purpose**: Returns Express app instance

**Returns**: `express.Express` - Express application

**Usage**:
```typescript
const server = appService.getServer();
server.use(newMiddleware);
```

## Architecture

### Service Layer Role
```
Controller
    ↓
AppService (Business Logic)
    ↓
ORM / Database
```

## Dependency Injection Pattern

### In Controllers
```typescript
export class TestController {
  constructor(public appService: AppService) {}
  
  async getAll(): Promise<Test[]> {
    const em = this.appService.getEntityManager();
    return em.getRepository<Test>('Test').findAll();
  }
}
```

### Injection Flow
1. Controller requires `AppService`
2. TypeDI container resolves dependency
3. `AppService` accesses global `DI` container
4. Returns instances from `DI`

## Data Access Pattern

```typescript
// In controller or service
const em = appService.getEntityManager();

// Get repository
const repo = em.getRepository<Test>('Test');

// Query operations
const all = await repo.findAll();
const one = await repo.findOne({ id: 1 });
const create = em.create(Test, { name: 'New' });
await em.flush();
```

## Key Concepts

### EntityManager Forking
- **Parent**: `DI.orm.em` - Global context
- **Fork**: `DI.orm.em.fork()` - Request-scoped context
- **Benefit**: Isolation and thread-safety

### Singleton Pattern
- AppService is singleton
- DI container manages lifetime
- Multiple injections reference same instance

## Dependencies
- `DI` container - Access to orm and server
- `@mikro-orm/core` - MikroORM types
- `express` - Express types
- `typedi` - Service decorator

## Related Files
- `di-container.ts` - DI storage
- `controllers/test-controller.ts` - Consumer
- `database/mikro-orm.ts` - ORM initialization
- `app.ts` - Server initialization

## Best Practices
- ✅ Always fork EntityManager for request handling
- ✅ Use this service as gateway to core resources
- ✅ Keep service methods minimal and focused
- ⚠️ Don't do complex business logic here
- ⚠️ Don't keep EntityManager references across requests

## Future Enhancements
- Add query helper methods (find, create, update, delete)
- Add transaction management
- Add caching layer
- Add logging/audit trail support
