import { Migration } from '@mikro-orm/migrations';

export class Migration0606162800 extends Migration {
  async up(): Promise<void> {

    this.addSql(
        `
        CREATE TABLE IF NOT EXISTS user_games
        (
          id BIGSERIAL PRIMARY KEY,
          steam_id varchar(255) not null,
          created_at timestamptz(0) not null,
          updated_at timestamptz(0) not null,
          games json NULL
        );
        `,
    );
    this.addSql(
        `CREATE INDEX IF NOT EXISTS idx_user_games_steam_id ON user_games(steam_id);`,
      );
  }
}
