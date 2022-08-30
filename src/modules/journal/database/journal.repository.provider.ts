import { Inject, Provider } from '@nestjs/common';
import { JournalRepository } from './journal.repository.service';

export const InjectJournalRepository = Inject(JournalRepository.name);

export const journalRepositoryProvider: Provider = {
  provide: JournalRepository.name,
  useClass: JournalRepository,
};
