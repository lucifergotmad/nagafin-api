import { Module } from '@nestjs/common';
import { BalanceRepositoryModule } from '../database/balance.repository.module';
import { balanceUseCaseProvider } from './balance.use-case.provider';

@Module({
  imports: [BalanceRepositoryModule],
  exports: balanceUseCaseProvider,
  providers: balanceUseCaseProvider,
})
export class BalanceUseCaseModule {}
