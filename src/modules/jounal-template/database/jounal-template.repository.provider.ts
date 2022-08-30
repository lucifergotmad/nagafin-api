import { Inject, Provider } from '@nestjs/common';
import { JounalTemplateRepository } from './jounal-template.repository.service';

export const InjectJounalTemplateRepository = Inject(
  JounalTemplateRepository.name,
);

export const jounalTemplateRepositoryProvider: Provider = {
  provide: JounalTemplateRepository.name,
  useClass: JounalTemplateRepository,
};
