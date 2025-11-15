import {Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import config from '../config/config';


const options: Options<PostgreSqlDriver> = {
  metadataProvider: ReflectMetadataProvider,
  entities: ['./dist/src/database/entities'], // path to our JS entities (dist), relative to `baseDir`
  dbName: config.postgres_db,
  password: config.postgres_password,
  user: config.postgres_user,
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
