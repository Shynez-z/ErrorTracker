# initializers/swagger.ts - API Documentation

## Location
`src/initializers/swagger.ts`

## Purpose
Automatically generates Swagger/OpenAPI schema from controller decorators and validation schemas for API documentation.

## Code

```typescript
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const swaggerFile = routingControllersToSpec(
  getMetadataArgsStorage(),
  { routePrefix: '/api/v1' },
  {
    components: {
      schemas,
    },
  }
);

export default swaggerFile;
```

## Components

### 1. Validation Metadata to Schemas
```typescript
const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});
```

**Purpose**: Converts class-validator decorators to JSON schemas

**What it does**:
- Reads `@IsAlpha()`, `@IsEmail()`, etc. decorators
- Generates OpenAPI/JSON schema definitions
- Creates reusable schema references

**Example Generated Schema** (from Test entity):
```json
{
  "Test": {
    "type": "object",
    "properties": {
      "id": { "type": "number" },
      "name": { "type": "string" },
      "createdAt": { "type": "string", "format": "date-time" },
      "updatedAt": { "type": "string", "format": "date-time" }
    }
  }
}
```

### 2. Routing Controllers to OpenAPI Spec
```typescript
const swaggerFile = routingControllersToSpec(
  getMetadataArgsStorage(),
  { routePrefix: '/api/v1' },
  { components: { schemas } }
);
```

**Parameters**:

| Parameter | Purpose |
|-----------|---------|
| `getMetadataArgsStorage()` | Controller metadata (decorators) |
| `{ routePrefix: '/api/v1' }` | API base path |
| `{ components: { schemas } }` | Schema definitions |

**What it generates**:
- Endpoints from `@Get`, `@Post`, `@Put`, `@Delete`
- Parameters, request/response types
- Status codes
- Documentation from decorators

### 3. Generated Swagger Schema

**Example Endpoint in Swagger**:
```
GET /api/v1/tests
├── Summary: Get all tests
├── Parameters: (none)
├── Responses:
│   ├── 200 OK
│   │   └── Schema: Test[]
│   └── 500 Error
└── Tags: Tests
```

---

## Integration in app.ts

```typescript
import swaggerSchema from './initializers/swagger.js';
import swaggerUi from 'swagger-ui-express';

if (config.swagger_route) {
  app.use(config.swagger_route, swaggerUi.serve);
  app.get(config.swagger_route, swaggerUi.setup(swaggerSchema));
}
```

**What happens**:
1. Serves Swagger UI static files at `/swagger`
2. Loads generated schema into UI
3. Makes interactive API documentation available

---

## Accessing Swagger UI

### Endpoint
```
http://localhost:3000/swagger
```

### In Swagger UI
- **Try it out**: Test endpoints directly
- **Schemas**: View entity/request schemas
- **Examples**: See request/response examples
- **Details**: View parameter types and validation

---

## How It Works (Automatic Generation)

### From Decorators
```typescript
@JsonController('/tests')
export class TestController {
  @Get('/')
  @ResponseSchema(Test)
  async getAll(): Promise<Test[]> { ... }
}
```

### Generates in Swagger
```json
{
  "paths": {
    "/tests": {
      "get": {
        "tags": ["TestController"],
        "operationId": "TestController_getAll",
        "responses": {
          "200": {
            "description": "Success",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": { "$ref": "#/components/schemas/Test" }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Test": {
        "type": "object",
        "properties": {
          "id": { "type": "number" },
          "name": { "type": "string" },
          "createdAt": { "type": "string", "format": "date-time" },
          "updatedAt": { "type": "string", "format": "date-time" }
        }
      }
    }
  }
}
```

---

## Key Decorators for Documentation

### In Controllers
```typescript
@Get('/')                              // Endpoint method
@ResponseSchema(Test)                  // Response type
async getAll(): Promise<Test[]> { }
```

### In Entities
```typescript
@IsAlpha()        // Validation: letters only
@IsEmail()        // Validation: email format
@IsNotEmpty()     // Validation: required
@IsNumber()       // Validation: number type
```

---

## Adding Documentation

### For New Endpoints

```typescript
@Post('/')
@ResponseSchema(Test)
async create(@Body() body: CreateTestDTO) {
  // Implementation
}
```

- `@ResponseSchema(Test)` adds response type to Swagger
- `@Body()` automatically documents request body
- Parameter types inferred from TypeScript

### For New Entities

```typescript
@Entity()
export class Error extends BaseEntity {
  @Property()
  @IsNotEmpty()
  @IsAlpha()
  message!: string;  // Automatically documented
}
```

- Decorators automatically appear in schema
- Validation rules documented as schema constraints

---

## Swagger UI Features

### Interactive Testing
1. Click "Try it out" on any endpoint
2. Fill in parameters
3. Click "Execute"
4. See response in real-time

### Schema Exploration
- Click schema names to see details
- View nested object structures
- See validation constraints

### Sharing Documentation
- Copy endpoint URLs
- Export as OpenAPI JSON
- Share Swagger link with team

---

## Output Exported

**File**: Swagger schema object (JSON structure)

**Usage**: Passed to `swaggerUi.setup()` in app.ts

**Format**: OpenAPI 3.0 compatible

---

## Dependencies
- `routing-controllers` - Controller decorators
- `routing-controllers-openapi` - OpenAPI generation
- `class-validator-jsonschema` - Schema generation
- `swagger-ui-express` - UI serving

## Related Files
- `app.ts` - Swagger UI registration
- `config/config.ts` - Swagger route config
- `controllers/` - Endpoint documentation source
- `database/entities/` - Schema source

## Best Practices
- ✅ Always add `@ResponseSchema()` to endpoints
- ✅ Use validation decorators for schema
- ✅ Document complex parameters with comments
- ✅ Keep Swagger auto-generated (don't edit JSON)
- ⚠️ Update decorators when API changes
- ⚠️ Test Swagger UI displays correctly

## Production Features
- Swagger typically disabled in production
- Can be restricted to authenticated users
- Can add API keys/security schemes
- Can version API documentation

## Example: Updating Swagger for New Endpoint

1. Add endpoint to controller:
```typescript
@Post('/create')
@ResponseSchema(Test)
async create(@Body() body: CreateTestDTO) { ... }
```

2. Define DTO with validation:
```typescript
export class CreateTestDTO {
  @IsNotEmpty()
  @IsAlpha()
  name!: string;
}
```

3. Access `/swagger` - schema auto-updates!

## Security Considerations
- ⚠️ Swagger exposes API structure
- Consider hiding in production
- Can add authentication to Swagger UI
- Document security schemes (API keys, OAuth)
