import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import { SystemMongoEntity, SystemDocument } from './model/system.mongo-entity';
import { SystemEntity } from '../domain/system.entity';
import { SystemRepositoryPort } from './system.repository.port';
import { SystemMongoMapper } from './model/system.mongo-mapper';
import { SystemIgnore } from 'src/core/constants/encryption/encryption-ignore';

@Injectable()
export class SystemRepository
  extends BaseRepository<SystemMongoEntity, SystemEntity>
  implements SystemRepositoryPort {
  constructor(
    @InjectModel(SystemMongoEntity.name)
    private systemModel: Model<SystemDocument>,
  ) {
    super(
      systemModel,
      new SystemMongoMapper(SystemEntity, SystemMongoEntity),
      SystemIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
