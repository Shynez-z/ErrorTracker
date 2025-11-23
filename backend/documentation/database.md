# database/ - Database Configuration & Entities

## Location
`src/database/`

## Purpose
Manages database connection, configuration, ORM setup, entity definitions, and migrations using MikroORM and PostgreSQL.

---

## Sub-Modules

### 1. mikro-orm.config.ts - ORM Configuration

**Purpose**: Defines MikroORM configuration for PostgreSQL

**Key Configuration**:
```typescript
const options: Options<PostgreSqlDriver> = {
  metadataProvider: ReflectMetadataProvider,
  entities: [path.join(__dirname, './entities/**/*.js')],
  dbName: config.postgres_db,
  password: config.postgres_password,
  user: config.postgres_user,
  schema: 'public',
  host: config.postgres_host,
  port: config.postgres_port,
  migrations: { ... }
};
```

**Settings**:
| Setting | Purpose |
|---------|---------|
| `metadataProvider` | TypeScript metadata reflection |
| `entities` | Glob pattern for entity files |
| `dbName` | PostgreSQL database name |
| `user/password` | Database credentials |
| `host/port` | Connection details |
| `schema` | PostgreSQL schema (public) |
| `migrations` | Migration folder paths |

**Migration Configuration**:
- **tableName**: `mikro_orm_migrations` - Tracks migrations
- **allOrNothing**: true - Rollback all if any migration fails
- **path**: Distribution path for compiled migrations
- **pathTs**: Source TypeScript path for migrations

---

### 2. mikro-orm.ts - Database Initialization

**Purpose**: Initializes ORM connection and runs pending migrations

**Code**:
```typescript
const init = async () => {
  const orm = await MikroORM.init<PostgreSqlDriver>(config);
  if (process.env.NODE_ENV !== 'test') {
    const migrator = orm.getMigrator();
    await migrator.up();
  }
  return orm;
};
```

**Flow**:
1. Initialize MikroORM with config
2. Skip migrations in test environment
3. Run all pending migrations in dev/prod
4. Return ORM instance

**Exported**: Default function - called from `index.ts`

---

### 3. base-entity/ - Base Entity Class

**Location**: `src/database/base-entity/base-entity.ts`

**Purpose**: Abstract base class for all entities with common fields

**Fields**:
```typescript
@PrimaryKey()
@IsNumber()
id!: number;

createdAt: Date = new Date();

@Property({ onUpdate: () => new Date() })
updatedAt: Date = new Date();
```

**Features**:
- `id` - Auto-increment primary key
- `createdAt` - Auto-set on creation
- `updatedAt` - Auto-updated on modification
- `@IsNumber()` - Validation decorator

**Usage**:
```typescript
@Entity()
export class Test extends BaseEntity {
  @Property()
  @IsAlpha()
  name!: string;
}
```

---

### 4. entities/ - Entity Definitions

**Location**: `src/database/entities/`

**Purpose**: Define database entity schemas and validations

#### test.ts - Test Entity

```typescript
@Entity()
export class Test extends BaseEntity {
  @Property()
  @IsAlpha()
  name!: string;

  constructor() {
    super();
  }
}
```

**Fields**:
| Field | Type | Validation | Purpose |
|-------|------|-----------|---------|
| `id` | number | @IsNumber | Primary key (inherited) |
| `name` | string | @IsAlpha | Only letters allowed |
| `createdAt` | Date | - | Auto-set (inherited) |
| `updatedAt` | Date | - | Auto-update (inherited) |

**Decorators**:
- `@Entity()` - Marks as database entity
- `@Property()` - Database column
- `@IsAlpha()` - Validation (letters only)

**Note**: Entity includes extra property note in comments - Swagger requires non-empty schema

---

## Database Operations

### Query Example
```typescript
const em = appService.getEntityManager();
const repo = em.getRepository<Test>('Test');

// Find all
const all = await repo.findAll();

// Find one
const one = await repo.findOne({ id: 1 });

// Create
const test = em.create(Test, { name: 'Item' });
await em.flush();

// Update
test.name = 'Updated';
await em.flush();

// Delete
em.remove(test);
await em.flush();
```

## Entity Relationship Diagram

```
BaseEntity (abstract)
├── id (PrimaryKey, number)
├── createdAt (Date)
└── updatedAt (Date, auto-update)

Test (extends BaseEntity)
├── id (inherited)
├── name (string, letters only)
├── createdAt (inherited)
└── updatedAt (inherited)
```

## Key Concepts

### Primary Key
- Auto-increment integer
- Enforced via `@PrimaryKey()` decorator
- Type-checked with `@IsNumber()`

### Timestamps
- **createdAt**: Set once on entity creation
- **updatedAt**: Auto-updated on each modification
- Useful for tracking entity lifecycle

### Validation
- `@IsAlpha()` - Name must contain only letters
- Can add more validators (Email, Length, etc.)
- Validation runs before database operations

### Migrations
- Auto-runs on startup (dev/prod only)
- Skipped in test environment
- Tracks applied migrations in database table

## Environment Setup

### Connection Parameters
```env
POSTGRES_DB=errortracker
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

## Dependencies
- `@mikro-orm/core` - Core ORM
- `@mikro-orm/postgresql` - PostgreSQL driver
- `class-validator` - Validation decorators
- `reflect-metadata` - TypeScript metadata

## Related Files
- `config/config.ts` - Database credentials
- `services/app-service.ts` - Database access gateway
- `controllers/test-controller.ts` - Query examples
- `index.ts` - ORM initialization

## Future Enhancements
- Add more entities (errors, users, etc.)
- Add relationships (OneToMany, ManyToOne)
- Add indexes for performance
- Create migration files for schema changes
- Add soft-delete support
- Add audit trail fields
