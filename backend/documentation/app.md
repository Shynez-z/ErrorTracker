# app.ts - Express Application Setup

## Location
`src/app.ts`

## Purpose
Initializes and configures the Express application with routing controllers, middleware, and Swagger documentation.

## Key Responsibilities
1. **Express Instance Creation** - Creates the main Express app
2. **Dependency Injection** - Integrates TypeDI container with routing-controllers
3. **Middleware Setup** - Configures CORS and other middleware
4. **Routing Controllers** - Registers controllers using decorator-based routing
5. **Swagger UI** - Sets up API documentation endpoint

## Key Code

### Dependency Injection Setup
```typescript
useContainer(Container);
```
- Connects TypeDI container to routing-controllers
- Enables automatic dependency injection in controllers

### CORS Configuration
```typescript
const options: cors.CorsOptions = {
  origin: '*'
};
app.use(cors(options));
```
- Allows requests from any origin (open CORS)
- Can be restricted to specific domains in production

### Routing Controllers
```typescript
app = useExpressServer(app, {
  controllers: [TestController],
  routePrefix: '/api/v1',
});
```
- Registers controller classes to handle routes
- Applies `/api/v1` prefix to all routes
- Routes defined via decorators in controllers

### Swagger Documentation
```typescript
app.use(config.swagger_route, swaggerUi.serve);
app.get(config.swagger_route, swaggerUi.setup(swaggerSchema));
```
- Serves Swagger UI at `/swagger`
- Schema automatically generated from controller decorators

## Dependencies
- `express` - Web framework
- `routing-controllers` - Decorator-based routing
- `typedi` - Dependency injection container
- `cors` - Cross-origin request middleware
- `swagger-ui-express` - Swagger UI serving

## Exports
- Default export: Express app instance

## Important Notes
- ⚠️ **CORS is wide open** (`origin: '*'`) - restrict in production
- ⚠️ **Legacy route imports commented out** - using decorator pattern instead
- ⚠️ **Global error handler commented out** - should be uncommented for production

## Next Steps
- Add additional controllers to `controllers` array
- Enable error handler middleware
- Restrict CORS to specific origins
