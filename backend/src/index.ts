import { Container } from 'typedi';
import app from './app.js';
import { config } from './config/config.js';
import { DatabaseService } from './services/database.service.js';

const port = config.port;

export const init = (async () => {
  try {

    const databaseService = Container.get(DatabaseService);

    // ⭐ Database retry pattern (cloud safe)
    const MAX_RETRIES = 5;

    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        await databaseService.initialize();
        break;
      } catch (err) {
        console.log(`DB connection retry ${i + 1}`);
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    console.log('✅ Database connected successfully');

    // ⭐ Important for Docker networking
    app.listen(port, "0.0.0.0", () => {

      const baseUrl = process.env.PUBLIC_URL || `http://localhost:${port}`;

      console.log(`🚀 Server running on port ${port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
      console.log(`📚 API Docs: ${baseUrl}${config.api.swaggerRoute}`);
      console.log(`🔗 Base API: ${baseUrl}${config.api.routePrefix}`);

    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
})();