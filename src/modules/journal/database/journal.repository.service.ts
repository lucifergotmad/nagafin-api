import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  JournalMongoEntity,
  JournalDocument,
} from './model/journal.mongo-entity';
import { JournalEntity } from '../domain/journal.entity';
import { JournalRepositoryPort } from './journal.repository.port';
import { JournalMongoMapper } from './model/journal.mongo-mapper';
import { JournalIgnore } from 'src/core/constants/encryption/encryption-ignore';

@Injectable()
export class JournalRepository
  extends BaseRepository<JournalMongoEntity, JournalEntity>
  implements JournalRepositoryPort {
  constructor(
    @InjectModel(JournalMongoEntity.name)
    private journalModel: Model<JournalDocument>,
  ) {
    super(
      journalModel,
      new JournalMongoMapper(JournalEntity, JournalMongoEntity),
      JournalIgnore,
    );
  }

  async isUsedInTransaction(acc_number: string): Promise<boolean> {
    const journal = await this.journalModel.findOne({
      'journal_detail.acc_number': acc_number,
    });
    return journal ? true : false;
  }
}
