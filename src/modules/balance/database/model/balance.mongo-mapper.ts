import {
  DbMapper,
  MongoEntityProps,
} from 'src/core/base-classes/domain/db-mapper';
import { BalanceEntity } from '../../domain/balance.entity';
import { BalanceMongoEntity } from './balance.mongo-entity';

export class BalanceMongoMapper extends DbMapper<
  BalanceEntity,
  BalanceMongoEntity
> {
  protected toMongoProps(
    entity: BalanceEntity,
  ): MongoEntityProps<BalanceMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<BalanceMongoEntity> = {
      // put field here
    };
    return mongoProps;
  }
}
