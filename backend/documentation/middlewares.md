# middlewares/error-handler.ts - Global Error Handler

## Location
`src/middlewares/error-handler.ts`

## Purpose
Centralized error handling middleware that catches exceptions and returns consistent error responses.

## Code

```typescript
export interface AppError extends Error {
  status?: number;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};
```

## Components

### AppError Interface
```typescript
interface AppError extends Error {
  status?: number;
}
```

**Purpose**: Custom error type with optional HTTP status code

**Properties**:
- `status` (optional) - HTTP status code (default: 500)
- `message` - Error message (inherited from Error)
- `name` - Error name (inherited from Error)

---

## Error Handler Function

### Parameters
| Param | Type | Purpose |
|-------|------|---------|
| `err` | AppError | Error object with message and status |
| `req` | Request | Express request object |
| `res` | Response | Express response object |
| `next` | NextFunction | Next middleware (not used) |

### Processing
1. **Logs Error**: `console.error(err)` - Server logs for debugging
2. **Extract Status**: Uses `err.status` or defaults to 500
3. **Send Response**: JSON response with message

### Response Format
```json
{
  "message": "Error description"
}
```

### Status Code Logic
- **If provided**: Uses `err.status` (e.g., 404, 400)
- **If missing**: Defaults to 500 (Internal Server Error)

---

## Common HTTP Status Codes

| Code | Use Case | Example |
|------|----------|---------|
| 400 | Bad Request | Invalid input data |
| 401 | Unauthorized | Missing authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate record |
| 500 | Server Error | Unhandled exception |

---

## Usage Pattern

### Creating AppError
```typescript
const error: AppError = new Error('User not found');
error.status = 404;
throw error;
```

### In Controller
```typescript
@Get('/:id')
async getTest(@Param('id') id: number) {
  const test = await em.getRepository<Test>('Test').findOne({ id });
  
  if (!test) {
    const error: AppError = new Error('Test not found');
    error.status = 404;
    throw error;
  }
  
  return test;
}
```

### Error Propagation
```
Controller throws AppError
    ↓
Express catches error
    ↓
errorHandler middleware
    ↓
JSON response sent
    ↓
Client receives error
```

---

## Current Status
⚠️ **COMMENTED OUT IN app.ts**

Current code in `app.ts`:
```typescript
// Global error handler (should be after routes)
//app.use(errorHandler);
```

### To Enable
```typescript
import { errorHandler } from './middlewares/errorHandler.js';

// After all routes
app.use(errorHandler);
```

---

## Middleware Registration

### Correct Order in Express
```typescript
// 1. Setup middleware
app.use(express.json());
app.use(cors(options));

// 2. Define routes
app = useExpressServer(app, { ... });

// 3. Error handler LAST
app.use(errorHandler);  // Must be last!
```

**Why Last?**
- Catches errors from all previous middleware and routes
- Must be registered after route handlers
- Express calls error handlers in reverse registration order

---

## Response Examples

### 404 Error
**Request**: `GET /api/v1/tests/999` (doesn't exist)

**Handler Code**:
```typescript
const error: AppError = new Error('Test not found');
error.status = 404;
throw error;
```

**Response**:
```json
HTTP/1.1 404 Not Found
{
  "message": "Test not found"
}
```

### 400 Error
**Request**: `POST /api/v1/tests` (invalid data)

**Handler Code**:
```typescript
const error: AppError = new Error('Name must contain only letters');
error.status = 400;
throw error;
```

**Response**:
```json
HTTP/1.1 400 Bad Request
{
  "message": "Name must contain only letters"
}
```

### 500 Error (No Status)
**Request**: Any route with unhandled error

**Handler Code**:
```typescript
throw new Error('Database connection failed');
// No status set, defaults to 500
```

**Response**:
```json
HTTP/1.1 500 Internal Server Error
{
  "message": "Database connection failed"
}
```

---

## Dependencies
- `express` - Request, Response, NextFunction types

## Related Files
- `app.ts` - Middleware registration
- `controllers/` - Error throwing
- `services/` - Error handling

## Best Practices
- ✅ Always set appropriate status codes
- ✅ Provide meaningful error messages
- ✅ Log errors for debugging
- ✅ Don't expose sensitive information
- ⚠️ Register error handler last
- ⚠️ Don't send response twice

## Production Enhancements
- Add error logging service (Winston, Pino)
- Add error tracking (Sentry, LogRocket)
- Add request correlation IDs
- Hide sensitive details in production
- Add error categorization (validation, auth, server, etc.)
- Add error response codes/identifiers
- Add retry-after headers for rate limits
- Add CORS headers to error responses

## Example Enhanced Response
```json
{
  "error": {
    "id": "err_12345",
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "status": 400,
    "timestamp": "2025-11-23T10:30:00Z",
    "details": {
      "field": "name",
      "message": "Must contain only letters"
    }
  }
}
```
