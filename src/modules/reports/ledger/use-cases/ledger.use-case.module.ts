import { Module } from '@nestjs/common';
import { ledgerUseCaseProvider } from './ledger.use-case.provider';

@Module({
  imports: [],
  exports: ledgerUseCaseProvider,
  providers: ledgerUseCaseProvider,
})
export class LedgerUseCaseModule {}
