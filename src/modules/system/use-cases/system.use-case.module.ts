import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from 'src/modules/account/database/account.repository.module';
import { SystemRepositoryModule } from '../database/system.repository.module';
import { systemUseCaseProvider } from './system.use-case.provider';

@Module({
  imports: [SystemRepositoryModule, AccountRepositoryModule],
  exports: systemUseCaseProvider,
  providers: systemUseCaseProvider,
})
export class SystemUseCaseModule {}
