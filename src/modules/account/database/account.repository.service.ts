import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  AccountMongoEntity,
  AccountDocument,
} from './model/account.mongo-entity';
import { AccountEntity } from '../domain/account.entity';
import { AccountRepositoryPort } from './account.repository.port';
import { AccountMongoMapper } from './model/account.mongo-mapper';
import { AccountIgnore } from 'src/core/constants/encryption/encryption-ignore';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountMongoEntity, AccountEntity>
  implements AccountRepositoryPort {
  constructor(
    @InjectModel(AccountMongoEntity.name)
    private AccountModel: Model<AccountDocument>,
  ) {
    super(
      AccountModel,
      new AccountMongoMapper(AccountEntity, AccountMongoEntity),
      AccountIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
