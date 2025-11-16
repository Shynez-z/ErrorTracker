import {Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: Options<PostgreSqlDriver> = {
  metadataProvider: ReflectMetadataProvider,
  entities: [path.join(__dirname, './entities/**/*.js')], // path to our JS entities (dist), relative to `baseDir`
  dbName: config.postgres_db,
  password: config.postgres_password,
  user: config.postgres_user,
  schema: 'public',
  host: config.postgres_host,
  port: config.postgres_port,
  migrations: {
    tableName: 'mikro_orm_migrations',
    allOrNothing: true,
    path: path.join(process.cwd(), 'dist/src/database/migrations'),
    pathTs: path.join(process.cwd(), 'src/database/migrations'),
  },
};

export default options;
