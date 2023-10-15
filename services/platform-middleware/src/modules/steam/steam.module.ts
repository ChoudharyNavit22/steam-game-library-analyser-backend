import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SteamController } from './steam.controller';
import { SteamService } from './steam.service';
import {
  UserGames
} from './entities/user-games.entity'

@Module({
  imports: [
    MikroOrmModule.forFeature([UserGames]),
  ],
  controllers: [SteamController],
  providers: [SteamService],
})
export class SteamModule {}
