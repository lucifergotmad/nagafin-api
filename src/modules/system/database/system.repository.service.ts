import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import { SystemMongoEntity, SystemDocument } from './model/system.mongo-entity';
import { SystemEntity } from '../domain/system.entity';
import { SystemRepositoryPort } from './system.repository.port';
import { SystemMongoMapper } from './model/system.mongo-mapper';

@Injectable()
export class SystemRepository
  extends BaseRepository<SystemMongoEntity, SystemEntity>
  implements SystemRepositoryPort {
  constructor(
    @InjectModel(SystemMongoEntity.name)
    private SystemModel: Model<SystemDocument>,
  ) {
    super(SystemModel, new SystemMongoMapper(SystemEntity, SystemMongoEntity));
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
