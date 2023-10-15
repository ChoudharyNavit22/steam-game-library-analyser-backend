import { Entity, JsonType, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../libs/BaseEntity';
import {
    IUserGames,
    ISteamUserGamesInfo
} from '../../../interfaces';

@Entity()
export class UserGames extends BaseEntity implements IUserGames {
  @PrimaryKey()
  id: number;

  @Property()
  steamId: string;

  @Property({ type: JsonType, nullable: false })
  games: ISteamUserGamesInfo;
}
