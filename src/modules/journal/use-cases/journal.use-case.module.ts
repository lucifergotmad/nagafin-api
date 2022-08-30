import { Module } from '@nestjs/common';
import { JournalRepositoryModule } from '../database/journal.repository.module';
import { journalUseCaseProvider } from './journal.use-case.provider';

@Module({
  imports: [JournalRepositoryModule],
  exports: journalUseCaseProvider,
  providers: journalUseCaseProvider,
})
export class JournalUseCaseModule {}
