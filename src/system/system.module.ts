import { Module } from '@nestjs/common';
import { ApiController } from './controllers/api/api.controller';
import { ConnexionController } from './controllers/connexion/connexion.controller';
import { ApiService } from './controllers/api/api.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnexionService } from './controllers/connexion/connexion.service';
import { db } from '../../config.json';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './controllers/user/user.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      dialectModule: require('mysql2'),
      host: db.host,
      port: parseInt(db.port),
      username: db.user,
      password: db.password,
      database: db.database,
      define: {
        freezeTableName: true
      }
    }),
  ],
  controllers: [ApiController, ConnexionController, UserController],
  providers: [ApiService, ConnexionService, UserService]
})
export class SystemModule {}
