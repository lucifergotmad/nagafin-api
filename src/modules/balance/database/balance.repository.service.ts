import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  BalanceMongoEntity,
  BalanceDocument,
} from './model/balance.mongo-entity';
import { BalanceEntity } from '../domain/balance.entity';
import { BalanceRepositoryPort } from './balance.repository.port';
import { BalanceMongoMapper } from './model/balance.mongo-mapper';

@Injectable()
export class BalanceRepository
  extends BaseRepository<BalanceMongoEntity, BalanceEntity>
  implements BalanceRepositoryPort {
  constructor(
    @InjectModel(BalanceMongoEntity.name)
    private BalanceModel: Model<BalanceDocument>,
  ) {
    super(
      BalanceModel,
      new BalanceMongoMapper(BalanceEntity, BalanceMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
