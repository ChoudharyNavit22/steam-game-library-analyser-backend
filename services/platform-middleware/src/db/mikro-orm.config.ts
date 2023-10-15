import type { MikroORMOptions } from '@mikro-orm/core';
import assert from 'assert';
import dotenv from 'dotenv';
import {UserGames} from '../modules/steam/entities/user-games.entity';

dotenv.config();

assert(
  process.env.DATABASE_TYPE === 'postgresql',
  `Unexpected DATABASE_TYPE: ${process.env.DATABASE_TYPE}`,
);

const config: Partial<MikroORMOptions> = {
  // Because we use webpack, we cannot use dynamic entities discovery
  // Refer to https://mikro-orm.io/docs/deployment

  discovery: { disableDynamicFileAccess: true },
  entities: [
    UserGames
  ],
  forceUtcTimezone: true,
  allowGlobalContext: false,
  dbName: process.env.DATABASE_NAME,
  type: process.env.DATABASE_TYPE,
  clientUrl: process.env.DATABASE_URL,
  tsNode: true,
  migrations: {
    tableName: 'platform_mikro_migrations',
    path: './dist/db/migrations/',
    glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts),
    dropTables: false,
    emit: 'ts',
  },
  pool: {
    min: 2,
    max: 100,
  },
  debug: (process.env.MIKRO_ORM_DEBUG?.split(',') as any) || false
};

export default config;
