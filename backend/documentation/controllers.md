# controllers/test-controller.ts - HTTP Request Handlers

## Location
`src/controllers/test-controller.ts`

## Purpose
Handles HTTP requests for the Test entity using decorator-based routing with dependency injection.

## Class Definition

```typescript
@JsonController('/tests')
@Service()
export class TestController { ... }
```

- `@JsonController('/tests')` - Routes all methods under `/tests` endpoint
- `@Service()` - Marks as TypeDI service for dependency injection
- Prefix combined with route prefix: `/api/v1/tests`

## Dependency Injection

```typescript
constructor(public appService: AppService) {}
```
- Automatically injects `AppService`
- TypeDI container resolves dependency
- Provides access to database via `EntityManager`

## Methods

### getAll()
```typescript
@Get('/', { transformResponse: false })
@ResponseSchema(Test)
async getAll(): Promise<Test[]>
```

**Endpoint**: `GET /api/v1/tests`

**Decorators**:
- `@Get('/')` - Maps to GET request
- `@ResponseSchema(Test)` - Swagger schema documentation
- `transformResponse: false` - Returns raw response

**Implementation**:
1. Gets entity manager from service
2. Finds Test repository
3. Retrieves all records
4. Returns array of Test entities

**Example Response**:
```json
[
  {
    "id": 1,
    "name": "Test Item",
    "createdAt": "2025-11-23T10:30:00Z",
    "updatedAt": "2025-11-23T10:30:00Z"
  }
]
```

## Type Definitions

### Input/Output
- Returns: `Promise<Test[]>` - Array of Test entities
- Uses: `Test` entity from database
- Validates: Via class-validator decorators on Test entity

## Architecture

### Request Flow
```
GET /api/v1/tests
    ↓
routing-controllers (decorator)
    ↓
TestController.getAll()
    ↓
AppService.getEntityManager()
    ↓
MikroORM Repository
    ↓
PostgreSQL Query
    ↓
Test[] Response
```

## Error Handling
- Unhandled errors propagate to global error handler
- Add error handling for production

## Dependencies
- `AppService` - Database access
- `routing-controllers` - Decorators
- `Test` entity - Data model

## Related Files
- `services/app-service.ts` - Business logic
- `database/entities/test.ts` - Entity definition
- `models/test.ts` - Data models
- `app.ts` - Controller registration

## Future Enhancements
- Add `@Post()` for create operations
- Add `@Put('/:id')` for updates
- Add `@Delete('/:id')` for deletion
- Add error handling decorators
- Add request validation
- Add authorization/authentication guards
