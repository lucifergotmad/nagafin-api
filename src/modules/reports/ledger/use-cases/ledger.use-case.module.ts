import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from 'src/modules/account/database/account.repository.module';
import { BalanceRepositoryModule } from 'src/modules/balance/database/balance.repository.module';
import { JournalRepositoryModule } from 'src/modules/journal/database/journal.repository.module';
import { ledgerUseCaseProvider } from './ledger.use-case.provider';

@Module({
  imports: [
    JournalRepositoryModule,
    BalanceRepositoryModule,
    AccountRepositoryModule,
  ],
  exports: ledgerUseCaseProvider,
  providers: ledgerUseCaseProvider,
})
export class LedgerUseCaseModule {}
