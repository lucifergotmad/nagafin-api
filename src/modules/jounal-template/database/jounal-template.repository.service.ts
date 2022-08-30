import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  JounalTemplateMongoEntity,
  JounalTemplateDocument,
} from './model/jounal-template.mongo-entity';
import { JounalTemplateEntity } from '../domain/jounal-template.entity';
import { JounalTemplateRepositoryPort } from './jounal-template.repository.port';
import { JounalTemplateMongoMapper } from './model/jounal-template.mongo-mapper';

@Injectable()
export class JounalTemplateRepository
  extends BaseRepository<JounalTemplateMongoEntity, JounalTemplateEntity>
  implements JounalTemplateRepositoryPort {
  constructor(
    @InjectModel(JounalTemplateMongoEntity.name)
    private JounalTemplateModel: Model<JounalTemplateDocument>,
  ) {
    super(
      JounalTemplateModel,
      new JounalTemplateMongoMapper(
        JounalTemplateEntity,
        JounalTemplateMongoEntity,
      ),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
