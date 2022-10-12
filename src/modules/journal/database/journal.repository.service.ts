import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model, Mongoose } from 'mongoose';
import {
  JournalMongoEntity,
  JournalDocument,
} from './model/journal.mongo-entity';
import { JournalEntity } from '../domain/journal.entity';
import { JournalRepositoryPort } from './journal.repository.port';
import { JournalMongoMapper } from './model/journal.mongo-mapper';
import { JournalIgnore } from 'src/core/constants/encryption/encryption-ignore';
import { JournalResponseDTO } from '../controller/dtos/journal.response.dto';

@Injectable()
export class JournalRepository
  extends BaseRepository<JournalMongoEntity, JournalEntity>
  implements JournalRepositoryPort {
  constructor(
    @InjectModel(JournalMongoEntity.name)
    private JournalModel: Model<JournalDocument>,
  ) {
    super(
      JournalModel,
      new JournalMongoMapper(JournalEntity, JournalMongoEntity),
      JournalIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
