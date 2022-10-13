import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from 'src/modules/account/database/account.repository.module';
import { BalanceRepositoryModule } from 'src/modules/balance/database/balance.repository.module';
import { balanceSheetsUseCaseProvider } from './balance-sheets.use-case.provider';

@Module({
  imports: [AccountRepositoryModule, BalanceRepositoryModule],
  exports: balanceSheetsUseCaseProvider,
  providers: balanceSheetsUseCaseProvider,
})
export class BalanceSheetsUseCaseModule {}
