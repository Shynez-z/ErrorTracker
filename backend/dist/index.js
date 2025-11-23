import { Container } from 'typedi';
import app from './app.js';
import { config } from './config/config.js';
import { DatabaseService } from './services/database.service.js';
const port = config.port;
export const init = (async () => {
    try {
        // Initialize database
        const databaseService = Container.get(DatabaseService);
        await databaseService.initialize();
        console.log('✅ Database connected successfully');
        console.log(`📊 Database: ${config.database.name}`);
        console.log(`🏠 Host: ${config.database.host}:${config.database.port}`);
        // Start server
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📝 Environment: ${config.nodeEnv}`);
            console.log(`📚 API Documentation: http://localhost:${port}${config.api.swaggerRoute}`);
            console.log(`🔗 API Base URL: http://localhost:${port}${config.api.routePrefix}`);
        });
        // Graceful shutdown
        process.on('SIGTERM', async () => {
            console.log('SIGTERM signal received: closing HTTP server');
            await databaseService.close();
            process.exit(0);
        });
        process.on('SIGINT', async () => {
            console.log('SIGINT signal received: closing HTTP server');
            await databaseService.close();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map