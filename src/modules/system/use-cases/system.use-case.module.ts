import { Module } from '@nestjs/common';
import { SystemRepositoryModule } from '../database/system.repository.module';
import { systemUseCaseProvider } from './system.use-case.provider';

@Module({
  imports: [SystemRepositoryModule],
  exports: systemUseCaseProvider,
  providers: systemUseCaseProvider,
})
export class SystemUseCaseModule {}
