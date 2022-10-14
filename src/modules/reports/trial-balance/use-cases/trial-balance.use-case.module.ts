import { Module } from '@nestjs/common';
import { BalanceRepositoryModule } from 'src/modules/balance/database/balance.repository.module';
import { trialBalanceUseCaseProvider } from './trial-balance.use-case.provider';

@Module({
  imports: [BalanceRepositoryModule],
  exports: trialBalanceUseCaseProvider,
  providers: trialBalanceUseCaseProvider,
})
export class TrialBalanceUseCaseModule {}
