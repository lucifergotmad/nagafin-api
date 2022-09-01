import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JournalTemplateModel } from './model/journal-template.mongo-entity';
import { journalTemplateRepositoryProvider } from './journal-template.repository.provider';

@Module({
  imports: [MongooseModule.forFeature(JournalTemplateModel)],
  providers: [journalTemplateRepositoryProvider],
  exports: [journalTemplateRepositoryProvider],
})
export class JournalTemplateRepositoryModule {}
