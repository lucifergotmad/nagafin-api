import { Module } from '@nestjs/common';
import { balanceSheetsUseCaseProvider } from './balance-sheets.use-case.provider';

@Module({
  imports: [],
  exports: balanceSheetsUseCaseProvider,
  providers: balanceSheetsUseCaseProvider,
})
export class BalanceSheetsUseCaseModule {}
