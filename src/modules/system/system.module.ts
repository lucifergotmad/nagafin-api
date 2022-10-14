import { Module } from '@nestjs/common';
import { SystemRepositoryModule } from './database/system.repository.module';
import { SystemUseCaseModule } from './use-cases/system.use-case.module';
import { SystemController } from './controller/system.controller';

@Module({
  imports: [SystemUseCaseModule, SystemRepositoryModule],
  controllers: [SystemController],
})
export class SystemModule {}
