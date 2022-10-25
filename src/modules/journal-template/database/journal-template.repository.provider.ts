import { Inject, Provider } from "@nestjs/common";
import { JournalTemplateRepository } from "./journal-template.repository.service";

export const InjectJournalTemplateRepository = Inject(
  JournalTemplateRepository.name,
);

export const journalTemplateRepositoryProvider: Provider = {
  provide: JournalTemplateRepository.name,
  useClass: JournalTemplateRepository,
};
