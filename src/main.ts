import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { application } from '../config.json';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(session({
    secret: application.secretSession,
    resave: true,
    saveUninitialized: true,
  }));

  app.useStaticAssets(resolve(__dirname + '\\..\\..\\public'));
  app.setBaseViewsDir(resolve(__dirname + '\\..\\..\\views'));
  app.setViewEngine('ejs');

  await app.listen(application.port);
}

bootstrap();