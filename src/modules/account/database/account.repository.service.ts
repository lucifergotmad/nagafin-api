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
    private accountModel: Model<AccountDocument>,
  ) {
    super(
      accountModel,
      new AccountMongoMapper(AccountEntity, AccountMongoEntity),
      AccountIgnore,
    );
  }

  async findActiveAccount(): Promise<AccountMongoEntity[]> {
    return await this.accountModel.find({ acc_active: true });
  }

  async findInactiveAccount(): Promise<AccountMongoEntity[]> {
    return await this.accountModel.find({ acc_active: false });
  }

  async isUsedAsParent(acc_number: string): Promise<boolean> {
    const result = await this.accountModel.findOne({ acc_parents: acc_number });
    return result ? true : false;
  }
}
