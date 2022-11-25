import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { ApiService } from './system/controllers/api/api.service';

@Module({
  imports: [SystemModule],
  controllers: [],
  providers: [ApiService],
})

export class AppModule {}