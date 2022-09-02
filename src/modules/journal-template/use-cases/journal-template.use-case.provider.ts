import { Provider } from '@nestjs/common';
import { CreateJournalTemplate } from './create-journal-template.use-case';
import { DeleteJournalTemplate } from './delete-journal-template.use-case';
import { FindAllJournalTemplate } from './find-all-journal-template.use-case';
import { FindJournalTemplateById } from './find-journal-template-by-id.use-case';
import { UpdateJournalTemplate } from './update-journal-template.use-case';

export const journalTemplateUseCaseProvider: Provider[] = [
  CreateJournalTemplate,
  UpdateJournalTemplate,
  DeleteJournalTemplate,
  FindAllJournalTemplate,
  FindJournalTemplateById,
];
