import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { JounalTemplateMongoEntity } from './model/jounal-template.mongo-entity';
import { JounalTemplateEntity } from '../domain/jounal-template.entity';

export interface JounalTemplateRepositoryPort
  extends BaseRepositoryPort<JounalTemplateMongoEntity, JounalTemplateEntity> {
  __init__(): void;
}
