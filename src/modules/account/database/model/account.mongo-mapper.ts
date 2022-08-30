import {
  DbMapper,
  MongoEntityProps,
} from 'src/core/base-classes/domain/db-mapper';
import { AccountEntity } from '../../domain/account.entity';
import { AccountMongoEntity } from './account.mongo-entity';

export class AccountMongoMapper extends DbMapper<
  AccountEntity,
  AccountMongoEntity
> {
  protected toMongoProps(
    entity: AccountEntity,
  ): MongoEntityProps<AccountMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<AccountMongoEntity> = {
      ...props,
      acc_parents: props?.acc_parents,
      acc_active: props?.acc_active,
      acc_number: props.acc_number.value,
    };

    return mongoProps;
  }
}
