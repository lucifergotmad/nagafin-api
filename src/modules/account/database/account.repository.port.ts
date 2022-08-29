import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { AccountMongoEntity } from './model/account.mongo-entity';
import { AccountEntity } from '../domain/account.entity';

export interface AccountRepositoryPort
  extends BaseRepositoryPort<AccountMongoEntity, AccountEntity> {
  __init__(): void;
}
