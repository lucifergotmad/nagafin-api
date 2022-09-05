import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from 'src/modules/account/database/account.repository.module';
import { BalanceRepositoryModule } from 'src/modules/balance/database/balance.repository.module';
import { JournalRepositoryModule } from '../database/journal.repository.module';
import { journalUseCaseProvider } from './journal.use-case.provider';

@Module({
  imports: [
    JournalRepositoryModule,
    BalanceRepositoryModule,
    AccountRepositoryModule,
  ],
  exports: journalUseCaseProvider,
  providers: journalUseCaseProvider,
})
export class JournalUseCaseModule {}
