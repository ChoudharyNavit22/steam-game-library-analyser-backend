import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config';

export async function migrateDb() {
  try {
    const orm = await MikroORM.init(config);
    const migrator = orm.getMigrator();
    console.log('Pending migration', await migrator.getPendingMigrations());
    await migrator.up(); // runs migrations up to the latest
    await orm.close(true);
  } catch (err) {
    console.log(err);
  }
}