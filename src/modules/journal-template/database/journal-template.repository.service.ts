import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  JournalTemplateMongoEntity,
  JournalTemplateDocument,
} from './model/journal-template.mongo-entity';
import { JournalTemplateEntity } from '../domain/jounal-template.entity';
import { JounalTemplateRepositoryPort } from './journal-template.repository.port';
import { JournalTemplateMongoMapper } from './model/journal-template.mongo-mapper';

@Injectable()
export class JournalTemplateRepository
  extends BaseRepository<JournalTemplateMongoEntity, JournalTemplateEntity>
  implements JounalTemplateRepositoryPort {
  constructor(
    @InjectModel(JournalTemplateMongoEntity.name)
    private JounalTemplateModel: Model<JournalTemplateDocument>,
  ) {
    super(
      JounalTemplateModel,
      new JournalTemplateMongoMapper(
        JournalTemplateEntity,
        JournalTemplateMongoEntity,
      ),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
