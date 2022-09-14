import { Module } from '@nestjs/common';
import { cashFlowUseCaseProvider } from './cash-flow.use-case.provider';

@Module({
  imports: [],
  exports: cashFlowUseCaseProvider,
  providers: cashFlowUseCaseProvider,
})
export class CashFlowUseCaseModule {}
