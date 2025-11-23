# package.json - Project Configuration & Dependencies

## Location
`backend/package.json`

## Purpose
Defines project metadata, scripts, and dependencies for npm package management.

## Project Metadata

```json
{
  "name": "backend",
  "version": "0.0.0",
  "description": "",
  "keywords": ["PEAN", "EXPRESS", "API"],
  "license": "ISC",
  "author": "shynez-z",
  "type": "module"
}
```

| Field | Value | Purpose |
|-------|-------|---------|
| `name` | backend | Package identifier |
| `version` | 0.0.0 | Semantic versioning (major.minor.patch) |
| `keywords` | PEAN, EXPRESS, API | Search terms |
| `license` | ISC | Open source license |
| `author` | shynez-z | Package author |
| `type` | module | ES modules (import/export syntax) |

---

## Scripts

```json
{
  "scripts": {
    "build": "rimraf ./dist && npx tsc",
    "prestart": "npm run build",
    "start": "node ./dist/index.js",
    "preserve": "npm run build",
    "serve": "npx tsc -w & nodemon ./dist/index.js"
  }
}
```

### build
```bash
npm run build
```
- **Command**: `rimraf ./dist && npx tsc`
- **Purpose**: Clean and compile TypeScript
- **Steps**:
  1. Delete `dist` folder (rimraf)
  2. Compile TypeScript to JavaScript (tsc)
- **Output**: JavaScript files in `dist/`

### prestart
```bash
npm run build
```
- **Runs automatically before** `npm start`
- Ensures fresh build before starting
- Prevents manual build step

### start
```bash
npm start
```
- **Command**: `node ./dist/index.js`
- **Purpose**: Start production server
- **Requires**: Compiled code in `dist/`
- **Flow**: Runs prestart → compiles → starts server

### preserve
```bash
npm run build
```
- **Runs automatically before** `npm run serve`
- Ensures TypeScript compiled before watch mode

### serve
```bash
npm run serve
```
- **Command**: `npx tsc -w & nodemon ./dist/index.js`
- **Purpose**: Development mode with auto-reload
- **Features**:
  1. `tsc -w` - TypeScript compiler in watch mode (auto-recompile on changes)
  2. `&` - Run parallel processes
  3. `nodemon` - Auto-restart Node when files change
- **Workflow**:
  - Edit `.ts` file → tsc compiles → nodemon restarts server

---

## Production vs Development

| Task | Development | Production |
|------|-------------|-----------|
| Watch changes | `npm run serve` | ✗ |
| Build once | `npm run build` | ✓ |
| Start server | Auto-restart | `npm start` |
| Code | TypeScript | Compiled JS |
| Speed | Slower | Faster |

---

## Dependencies

```json
{
  "dependencies": {
    "@mikro-orm/core": "^6.6.0",
    "@mikro-orm/postgresql": "^6.6.0",
    "@types/express": "^5.0.5",
    "class-validator": "^0.14.2",
    "class-validator-jsonschema": "^5.1.0",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "rimraf": "^6.1.0",
    "routing-controllers": "^0.11.3",
    "routing-controllers-openapi": "^5.0.0",
    "swagger-ui-express": "^5.0.1",
    "typedi": "^0.10.0",
    "typescript": "^5.9.3"
  }
}
```

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `@mikro-orm/core` | ^6.6.0 | ORM core |
| `@mikro-orm/postgresql` | ^6.6.0 | PostgreSQL driver |
| `typedi` | ^0.10.0 | Dependency injection |
| `routing-controllers` | ^0.11.3 | Decorator-based routing |
| `cors` | ^2.8.5 | CORS middleware |
| `class-validator` | ^0.14.2 | Input validation |
| `routing-controllers-openapi` | ^5.0.0 | OpenAPI generation |
| `swagger-ui-express` | ^5.0.1 | Swagger UI |
| `class-validator-jsonschema` | ^5.1.0 | JSON schema generation |
| `rimraf` | ^6.1.0 | Cross-platform rm -rf |
| `typescript` | ^5.9.3 | TypeScript compiler |
| `@types/express` | ^5.0.5 | TypeScript types for Express |

### Version Scheme

**Caret (^)** - Compatible with version
- `^5.1.0` - Allows 5.x.x (not 6.0.0)
- Installed: Latest patch and minor
- Example: `^5.1.0` could install `5.5.3`

---

## Dev Dependencies

```json
{
  "devDependencies": {
    "@types/cors": "^2.8.19",
    "@types/swagger-ui-express": "^4.1.8"
  }
}
```

| Package | Purpose |
|---------|---------|
| `@types/cors` | TypeScript types for cors package |
| `@types/swagger-ui-express` | TypeScript types for swagger-ui-express |

---

## Technology Stack Summary

### Framework Layer
- **Express** - Web server/router
- **routing-controllers** - Decorator-based routing

### Database Layer
- **MikroORM** - ORM for database operations
- **PostgreSQL** - Relational database driver

### Validation & Documentation
- **class-validator** - Input validation
- **Swagger UI** - API documentation
- **OpenAPI** - Standard API specification

### Development
- **TypeScript** - Type-safe JavaScript
- **Nodemon** - Auto-restart on changes

### Dependency Injection
- **TypeDI** - IoC container

---

## Architecture Overview

```
npm scripts
├── build         → tsc compilation
├── start         → production server
└── serve         → development with watch

Dependencies
├── Web Framework (Express, routing-controllers)
├── Database (MikroORM, PostgreSQL)
├── Validation (class-validator)
├── Documentation (Swagger UI)
└── Utilities (cors, TypeDI)
```

---

## Common Commands

### Development
```bash
npm run serve      # Watch mode + auto-restart
npm run build      # Compile TypeScript
npm run prestart   # Check build
```

### Production
```bash
npm run build      # Build once
npm start         # Start server
```

### Installation
```bash
npm install       # Install all dependencies
npm install <pkg> # Add new package
npm install --save-dev <pkg> # Add dev dependency
```

### Updating
```bash
npm update        # Update to latest compatible versions
npm audit fix     # Fix security vulnerabilities
```

---

## Versioning

### Current Version: 0.0.0
- **0** - Major (API breaking changes)
- **0** - Minor (new features)
- **0** - Patch (bug fixes)

### Next Steps
- Consider v0.1.0 for feature complete
- Consider v1.0.0 for production release

### Semantic Versioning Guide
- **0.1.0** - Beta/feature complete
- **1.0.0** - First stable release
- **2.0.0** - Major API changes

---

## File Structure

```
backend/
├── package.json          (this file)
├── tsconfig.json         (TypeScript config)
├── src/                  (source code)
│   ├── index.ts         (entry point)
│   ├── app.ts           (Express setup)
│   └── ...
├── dist/                (compiled output)
│   └── (generated after build)
└── node_modules/        (dependencies)
    └── (installed packages)
```

---

## Related Files
- `tsconfig.json` - TypeScript compilation config
- `.env` - Environment variables
- `src/index.ts` - Application entry point
- `src/app.ts` - Express configuration

## Best Practices
- ✅ Run `npm install` after cloning
- ✅ Commit `package-lock.json` for reproducible installs
- ✅ Use `npm run serve` for development
- ✅ Use `npm start` for production
- ⚠️ Update dependencies regularly
- ⚠️ Run `npm audit fix` for security updates
- ⚠️ Test after major dependency updates

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
# Windows: netstat -ano | findstr :3000
# macOS/Linux: lsof -i :3000
```

### Module Not Found
```bash
npm install        # Reinstall dependencies
npm cache clean --force  # Clear npm cache
```

### TypeScript Compilation Error
```bash
npm run build      # See detailed errors
# Check tsconfig.json configuration
```

### Stale Compilation
```bash
npm run build      # Forces fresh compile
rm -rf dist        # Delete old dist folder
npm install        # Reinstall dependencies
```
