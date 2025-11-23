import { Service } from 'typedi';
import { MikroORM, EntityManager } from '@mikro-orm/core';
import type { PostgreSqlDriver } from '@mikro-orm/postgresql';
import mikroOrmConfig from '../database/mikro-orm.config.js';

@Service()
export class DatabaseService {
    private orm!: MikroORM<PostgreSqlDriver>;

    async initialize(): Promise<void> {
        this.orm = await MikroORM.init<PostgreSqlDriver>(mikroOrmConfig);

        // Run migrations in non-test environments
        if (process.env.NODE_ENV !== 'test') {
            const migrator = this.orm.getMigrator();
            await migrator.up();
        }
    }

    getOrm(): MikroORM<PostgreSqlDriver> {
        if (!this.orm) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return this.orm;
    }

    getEntityManager(): EntityManager {
        if (!this.orm) {
            throw new Error('Database not initialized. Call initialize() first.');
        }
        return this.orm.em.fork();
    }

    async close(): Promise<void> {
        if (this.orm) {
            await this.orm.close();
        }
    }
}
