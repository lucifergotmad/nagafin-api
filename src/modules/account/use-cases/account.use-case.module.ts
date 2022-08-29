import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from '../database/account.repository.module';
import { accountUseCaseProvider } from './account.use-case.provider';

@Module({
  imports: [AccountRepositoryModule],
  exports: accountUseCaseProvider,
  providers: accountUseCaseProvider,
})
export class AccountUseCaseModule {}
