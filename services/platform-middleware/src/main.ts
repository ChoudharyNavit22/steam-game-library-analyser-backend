import dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { migrateDb } from './db';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  await migrateDb();

  const port = configService.get<number>('PORT') || 3000;
  const hostname = '0.0.0.0';

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Platform Middleware')
    .setDescription('Platform Middleware')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port,hostname,()=>{
    console.log(`Platform Middleware started at //${hostname}:${port}`)
  });
}
bootstrap();
