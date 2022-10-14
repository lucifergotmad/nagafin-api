import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { SystemMongoEntity } from './model/system.mongo-entity';
import { SystemEntity } from '../domain/system.entity';

export interface SystemRepositoryPort
  extends BaseRepositoryPort<SystemMongoEntity, SystemEntity> {
  __init__(): void;
}
