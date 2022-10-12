import { Module } from '@nestjs/common';
import { JournalRepositoryModule } from 'src/modules/journal/database/journal.repository.module';
import { AccountRepositoryModule } from '../database/account.repository.module';
import { accountUseCaseProvider } from './account.use-case.provider';

@Module({
  imports: [AccountRepositoryModule, JournalRepositoryModule],
  exports: accountUseCaseProvider,
  providers: accountUseCaseProvider,
})
export class AccountUseCaseModule {}
