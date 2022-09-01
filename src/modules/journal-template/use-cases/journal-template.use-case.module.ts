import { Module } from '@nestjs/common';
import { JournalTemplateRepositoryModule } from '../database/journal-template.repository.module';
import { journalTemplateUseCaseProvider } from './journal-template.use-case.provider';

@Module({
  imports: [JournalTemplateRepositoryModule],
  exports: journalTemplateUseCaseProvider,
  providers: journalTemplateUseCaseProvider,
})
export class JournalTemplateUseCaseModule {}
