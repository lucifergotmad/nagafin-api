import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { JournalMongoEntity } from './model/journal.mongo-entity';
import { JournalEntity } from '../domain/journal.entity';

export interface JournalRepositoryPort
  extends BaseRepositoryPort<JournalMongoEntity, JournalEntity> {
  __init__(): void;
}
