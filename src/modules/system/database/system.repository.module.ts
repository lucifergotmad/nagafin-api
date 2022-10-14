import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModel } from './model/system.mongo-entity';
import { systemRepositoryProvider } from './system.repository.provider';

@Module({
  imports: [MongooseModule.forFeature(SystemModel)],
  providers: [systemRepositoryProvider],
  exports: [systemRepositoryProvider],
})
export class SystemRepositoryModule {}
