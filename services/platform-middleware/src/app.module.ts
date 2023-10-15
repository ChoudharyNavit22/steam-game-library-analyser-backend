import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DemoModule } from './modules/demo/demo.module';
import { SteamModule } from './modules/steam/steam.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from './db/mikro-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRoot(ormConfig),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','..','..', 'public'),   // <-- path to the static files
    }),
    DemoModule,
    SteamModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
