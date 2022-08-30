import {
  DbMapper,
  MongoEntityProps,
} from 'src/core/base-classes/domain/db-mapper';
import { CurrencyEntity } from '../../domain/currency.entity';
import { CurrencyMongoEntity } from './currency.mongo-entity';

export class CurrencyMongoMapper extends DbMapper<
  CurrencyEntity,
  CurrencyMongoEntity
> {
  protected toMongoProps(
    entity: CurrencyEntity,
  ): MongoEntityProps<CurrencyMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<CurrencyMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
