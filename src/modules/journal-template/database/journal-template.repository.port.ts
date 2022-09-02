import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { JournalTemplateMongoEntity } from './model/journal-template.mongo-entity';
import { JournalTemplateEntity } from '../domain/jounal-template.entity';

export interface JournalTemplateRepositoryPort
  extends BaseRepositoryPort<
    JournalTemplateMongoEntity,
    JournalTemplateEntity
  > {
  __init__(): void;
}
