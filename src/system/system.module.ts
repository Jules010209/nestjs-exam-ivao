import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api/api.controller';
import { ConnexionController } from './controllers/connexion/connexion.controller';
import { ApiService } from './controllers/api/api.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnexionService } from './controllers/connexion/connexion.service';
import { db } from '../../config.json';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      host: db.host,
      port: parseInt(db.port),
      username: db.user,
      password: db.password,
      database: db.database
    }),
  ],
  controllers: [ApiController, ConnexionController],
  providers: [ApiService, ConnexionService]
})
export class SystemModule {}
