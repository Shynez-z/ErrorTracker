# index.ts - Server Entry Point

## Location
`src/index.ts`

## Purpose
Application entry point that initializes the database and starts the Express server.

## Key Responsibilities
1. **Database Initialization** - Connects to PostgreSQL via MikroORM
2. **Server Startup** - Starts Express server on configured port
3. **Dependency Injection** - Populates DI container with ORM and server instances
4. **Error Handling** - Manages initialization errors

## Key Code

### Database Initialization
```typescript
const orm = await initDb();
```
- Connects to PostgreSQL database
- Runs pending migrations
- Returns MikroORM instance

### Server Startup
```typescript
app.listen(port);
```
- Starts Express server on `PORT` environment variable (default: 3000)

### DI Container Population
```typescript
DI.orm = orm;
DI.server = app;
```
- Stores ORM and Express app in global DI container
- Makes them available to services via dependency injection

## Dependencies
- `app.ts` - Express application instance
- `config.ts` - Configuration management
- `mikro-orm.ts` - Database initialization function
- `di-container.ts` - Dependency injection container

## Exports
- `init` promise - Resolves when server is ready

## Execution Flow
```
1. Import app (triggers Express setup)
2. Import config (loads environment variables)
3. Initialize database (await initDb())
4. Start Express server (app.listen())
5. Populate DI container (DI.orm, DI.server)
```

## Important Notes
- ✅ Async initialization pattern
- ⚠️ Port defaults to 3000 if not in environment
- ⚠️ Must await `init` promise before using server in tests

## Default Port
- **Development**: 3000
- **Environment Variable**: `PORT`

## Access
- **API Base**: `http://localhost:3000/api/v1`
- **Swagger Docs**: `http://localhost:3000/swagger`
