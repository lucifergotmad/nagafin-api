import { Module } from '@nestjs/common';
import { JournalTemplateRepositoryModule } from './database/journal-template.repository.module';
import { JournalTemplateUseCaseModule } from './use-cases/journal-template.use-case.module';
import { JounalTemplateController } from './controller/journal-template.controller';

@Module({
  imports: [JournalTemplateUseCaseModule, JournalTemplateRepositoryModule],
  controllers: [JounalTemplateController],
})
export class JournalTemplateModule {}
