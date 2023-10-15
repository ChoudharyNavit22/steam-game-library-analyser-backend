 import {
  IsString,
  IsNotEmpty,
  IsOptional
 } from 'class-validator';
 import {
  ISteamUserGamesInfo
} from '../../../interfaces';
  
  export class CreateUserGamesDto {
    @IsString()
    steamId: string;
  
    @IsNotEmpty()
    games: ISteamUserGamesInfo;
  
    @IsOptional()
    createdAt: Date = new Date();
  
    @IsOptional()
    updatedAt: Date = new Date();
  
  }
  