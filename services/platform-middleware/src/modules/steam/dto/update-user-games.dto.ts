import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserGamesDto } from './create-user-games.dto';
import {
    ISteamUserGamesInfo
  } from '../../../interfaces';

export class UpdateUserGamesDto extends PartialType(CreateUserGamesDto) {

  @IsOptional()
  games: ISteamUserGamesInfo;

  @IsOptional()
  updatedAt: Date = new Date();

}
