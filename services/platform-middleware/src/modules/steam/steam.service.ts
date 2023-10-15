import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config'
import { EntityRepository, EntityManager, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import _ from 'lodash';
import {
    steamSDK,
    ISteamAccountInfo,
    ISteamUserGamesInfo
} from '@steam/steam-sdk';
import {CreateUserGamesDto} from './dto/create-user-games.dto';
import {UpdateUserGamesDto} from './dto/update-user-games.dto';
import {UserGames} from './entities/user-games.entity';
import type { IMutationResult,IUserGamesStats } from '../../interfaces';

@Injectable()
export class SteamService {
    private steamKey: string;

    constructor(
      private configService: ConfigService,
      @InjectRepository(UserGames)
      private readonly userGamesRepository: EntityRepository<UserGames>,
      private readonly em: EntityManager,
      ) {
        this.steamKey =
        this.configService.get<string>('STEAM_KEY') || '';
    }

    private async getUserGamesFromDB(steamId: string) {
      try {
        const result = await this.userGamesRepository.findOne(
          { steamId }
        );
  
        return result || null;
      } catch (err) {
        return null;
      }
    }

    public async addUserGamesToDB(userGames: CreateUserGamesDto): Promise<IMutationResult> {
  
      const newUserGameObject = this.em.create(UserGames, userGames);
  
      try {
        await this.em.persistAndFlush(newUserGameObject);
      } catch (err: any) {
        return {
          success: false,
          message: err.message,
        };
      }
      return {
        success: true
      };
    }

    async updateUserGamesToDB(
      steamId: string,
      updateUserGamesDto: UpdateUserGamesDto,
    ): Promise<IMutationResult> {
      const existing = await this.getUserGamesFromDB(steamId);
      if (existing === null) {
        return {
          success: false,
          message: 'User games data could not be find',
        };
      }
      wrap(existing).assign(updateUserGamesDto);
  
      try {
        await this.em.persistAndFlush(existing);
      } catch (err: any) {
        console.error(err);
        return {
          success: false,
          message: err.message,
        };
      }
      return {
        success: true,
      };
    }

    async parseGameStats(
      gameInfo: ISteamUserGamesInfo
    ): Promise<IUserGamesStats>{
      const mostPlayedGame: any = _.maxBy(gameInfo.games,'playtime_forever');
      const totalPlaytime = Math.round((_.sum(_.map(gameInfo.games, 'playtime_forever')))*100)/100 ;
      
      return {
        ...gameInfo,
        mostPlayedGame,
        totalPlaytime
      }
    }

    public async getAccountInfo(
        steamId: string,
      ): Promise<ISteamAccountInfo | undefined> {
        const sdk = new steamSDK(this.steamKey);
        return await sdk.getAccountInfo(steamId);
      }

      public async getUserGamesInfo(
        steamId: string,
        liveUpdate: string
      ): Promise<IUserGamesStats | any> {
        const sdk = new steamSDK(this.steamKey);
        const userGamesInfo = await this.getUserGamesFromDB(steamId);
        if(liveUpdate === "true") {
          const userGameInfoFromSDK = await sdk.getUserGamesInfo(steamId);
          if(userGameInfoFromSDK.game_count != 0) {
            if(userGamesInfo) {
              await this.updateUserGamesToDB(steamId,{
                games: userGameInfoFromSDK,
                updatedAt: new Date()
              })
            }
            else {
              await this.addUserGamesToDB({
                steamId,
                games: userGameInfoFromSDK,
                createdAt: new Date(),
                updatedAt: new Date()
              })
            }
          }
          return await this.parseGameStats(userGameInfoFromSDK);
        }
        else {
          if(userGamesInfo) {
            return await this.parseGameStats(userGamesInfo.games);
          }
          else {
            const userGameInfoFromSDK = await sdk.getUserGamesInfo(steamId);
            if(userGameInfoFromSDK.game_count != 0) {
              await this.addUserGamesToDB({
                steamId,
                games: userGameInfoFromSDK,
                createdAt: new Date(),
                updatedAt: new Date()
              })
            }
            return await this.parseGameStats(userGameInfoFromSDK);
          }
        }
      }
}
