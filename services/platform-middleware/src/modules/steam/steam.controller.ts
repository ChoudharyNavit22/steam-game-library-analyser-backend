import { BadRequestException, Controller, DefaultValuePipe, Get, HttpException, HttpStatus, Param, ParseEnumPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SteamService } from './steam.service';
import type { ISingleValueHttpResponse } from '../../interfaces';
import {
    ISteamAccountInfo
} from '@steam/steam-sdk';
import type { IUserGamesStats } from '../../interfaces';

@ApiTags('steam')
@Controller('steam')
export class SteamController {
  constructor(private readonly steamService: SteamService) {}

  @Get('/user/:id')
  async getAccountInfo(
    @Param('id') steamId: string,
  ): Promise<ISingleValueHttpResponse<ISteamAccountInfo>> {
    try {
      const result = await this.steamService.getAccountInfo(steamId);
      if(result) {
        return {
          success: true,
          data: result || undefined,
        };
      }
      throw new Error("Profile could not be found");
    } catch (err: any) {
      throw new HttpException({
        success: false,
        message: err.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('/user/:id/games')
  async getUserGamesInfo(
    @Param('id') steamId: string,
    @Query(
      'liveUpdate',
      new DefaultValuePipe('false'),
      new ParseEnumPipe(
        {
          true: "true",
          false: "false",
        },
        {
          exceptionFactory: (_e): void => {
            throw new BadRequestException('Invalid live Update value can only be true/false');
          },
        },
      ),
    )
    liveUpdate: string,
  ): Promise<ISingleValueHttpResponse<IUserGamesStats>> {
    try {
      const result = await this.steamService.getUserGamesInfo(steamId,liveUpdate);
      return {
        success: true,
        data: result || undefined,
      };
    } catch (err: any) {
      throw new HttpException({
        success: false,
        message: err.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }
}

