import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { ApiService } from './system/controllers/api/api.service';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConnexionService } from './system/controllers/connexion/connexion.service';

@Module({
  imports: [SystemModule],
  controllers: [AppController],
  providers: [ApiService, AppService, ConnexionService],
})

export class AppModule {}