import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,

  metadataProvider: ReflectMetadataProvider,

  entities: [path.join(__dirname, './entities/**/*.js')],

  schema: 'public',

  clientUrl: "postgresql://shynez:0qCHzvqqPbGJXHYrOVGfU34HVNDnU8bh@dpg-d6jkfh4r85hc739h3qmg-a.frankfurt-postgres.render.com/pjme01", // ⭐ IMPORTANT CLOUD PATTERN

  migrations: {
    tableName: 'mikro_orm_migrations',

    allOrNothing: true,

    path: path.join(process.cwd(), 'dist/src/database/migrations'),

    pathTs: path.join(process.cwd(), 'src/database/migrations'),
  },
};

export default options;