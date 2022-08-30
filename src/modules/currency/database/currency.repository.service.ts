import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  CurrencyMongoEntity,
  CurrencyDocument,
} from './model/currency.mongo-entity';
import { CurrencyEntity } from '../domain/currency.entity';
import { CurrencyRepositoryPort } from './currency.repository.port';
import { CurrencyMongoMapper } from './model/currency.mongo-mapper';

@Injectable()
export class CurrencyRepository
  extends BaseRepository<CurrencyMongoEntity, CurrencyEntity>
  implements CurrencyRepositoryPort {
  constructor(
    @InjectModel(CurrencyMongoEntity.name)
    private CurrencyModel: Model<CurrencyDocument>,
  ) {
    super(
      CurrencyModel,
      new CurrencyMongoMapper(CurrencyEntity, CurrencyMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
