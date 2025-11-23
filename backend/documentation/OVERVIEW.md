# Backend Documentation

## Project Overview

**ErrorTracker Backend** - A TypeScript/Express API built with modern architecture patterns using dependency injection, decorator-based routing, and PostgreSQL database.

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express 5.1.0
- **Language**: TypeScript 5.9.3
- **Database**: PostgreSQL (via MikroORM)
- **Routing**: routing-controllers 0.11.3 (decorator-based)
- **DI Container**: TypeDI 0.10.0
- **API Documentation**: Swagger UI
- **Validation**: class-validator

### Key Features
- ✅ Decorator-based routing (modern approach)
- ✅ Type-safe dependency injection
- ✅ Swagger/OpenAPI documentation
- ✅ PostgreSQL ORM integration
- ✅ CORS support
- ✅ Global error handling
- ✅ Environment configuration

---

## Folder Structure

```
src/
├── app.ts                 # Express app setup & routing
├── index.ts               # Server entry point
├── di-container.ts        # Dependency injection configuration
├── config/                # Configuration management
├── controllers/           # HTTP request handlers (decorator-based)
├── services/              # Business logic layer
├── database/              # ORM configuration & entities
├── middlewares/           # Express middleware
├── initializers/          # App initializers (Swagger, etc)
├── models/                # Data models
├── routes/                # [Deprecated] Legacy routing
└── types/                 # TypeScript type definitions
```

---

## See Individual File Documentation

- [app.ts](./app.md)
- [index.ts](./index.md)
- [di-container.ts](./di-container.md)
- [Config Module](./config.md)
- [Controllers](./controllers.md)
- [Services](./services.md)
- [Database](./database.md)
- [Middlewares](./middlewares.md)
- [Initializers](./initializers.md)
- [package.json](./package-json.md)

---

## Architecture Pattern

### Request Flow
```
HTTP Request
    ↓
Express Router (routing-controllers)
    ↓
@JsonController + Decorators
    ↓
Controller Method (TestController)
    ↓
Service Layer (AppService)
    ↓
Database Layer (MikroORM)
    ↓
Response
```

### Dependency Injection
- Uses **TypeDI** container
- Services marked with `@Service()` decorator
- Controllers marked with `@JsonController()` + `@Service()`
- Automatic constructor injection

---

## Getting Started

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create `.env` file:
```
PORT=3000
NODE_ENV=development
POSTGRES_DB=errortracker
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
API_ROUTE_PREFIX=/api/v1
SWAGGER_ROUTE=/swagger
```

### Build & Run
```bash
npm run build          # Build TypeScript
npm start             # Run compiled app
npm run serve         # Watch mode (dev)
```

### API Access
- **Base URL**: `http://localhost:3000/api/v1`
- **Swagger Docs**: `http://localhost:3000/swagger`

---

## Key Concepts

### Routing (Decorator-Based)
Routes are defined directly in controllers using `routing-controllers` decorators:
```typescript
@JsonController('/tests')
@Service()
export class TestController {
  @Get('/')
  async getAll(): Promise<Test[]> { ... }
}
```

### Database Access
Uses MikroORM with PostgreSQL:
- Entities inherit from `BaseEntity`
- Managed through `EntityManager`
- Accessed via `AppService.getEntityManager()`

### Configuration
Centralized in `config/config.ts` with environment variable support

### Error Handling
Global error handler middleware catches and formats errors

