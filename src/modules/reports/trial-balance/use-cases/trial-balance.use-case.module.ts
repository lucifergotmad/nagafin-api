import { Module } from '@nestjs/common';
import { trialBalanceUseCaseProvider } from './trial-balance.use-case.provider';

@Module({
  imports: [],
  exports: trialBalanceUseCaseProvider,
  providers: trialBalanceUseCaseProvider,
})
export class TrialBalanceUseCaseModule {}
