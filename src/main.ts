import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join, resolve } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve(__dirname + '\\..\\..\\public'));
  app.setBaseViewsDir(resolve(__dirname + '\\..\\..\\views'));
  app.setViewEngine('ejs');

  await app.listen(3000);
}

bootstrap();