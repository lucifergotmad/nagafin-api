import { Module } from '@nestjs/common';
import { journalReportsUseCaseProvider } from './journal-reports.use-case.provider';

@Module({
  imports: [],
  exports: journalReportsUseCaseProvider,
  providers: journalReportsUseCaseProvider,
})
export class JournalReportsUseCaseModule {}
