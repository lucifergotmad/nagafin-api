import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { BalanceMongoEntity } from './model/balance.mongo-entity';
import { BalanceEntity } from '../domain/balance.entity';

export interface BalanceRepositoryPort
  extends BaseRepositoryPort<BalanceMongoEntity, BalanceEntity> {
  __init__(): void;
}
