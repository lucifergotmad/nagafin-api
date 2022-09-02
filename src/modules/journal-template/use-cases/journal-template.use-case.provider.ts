import { Provider } from '@nestjs/common';
import { CreateJournalTemplate } from './create-journal-template.use-case';
import { DeleteJournalTemplate } from './delete-journal-template.use-case';

export const journalTemplateUseCaseProvider: Provider[] = [
  CreateJournalTemplate,
  DeleteJournalTemplate,
];
