import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { TransactionLogEntity } from "../../domain/transaction-log.entity";
import { TransactionLogMongoEntity } from "./transaction-log.mongo-entity";

export class TransactionLogMongoMapper extends DbMapper<
  TransactionLogEntity,
  TransactionLogMongoEntity
> {
  protected toMongoProps(
    entity: TransactionLogEntity,
  ): MongoEntityProps<TransactionLogMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<TransactionLogMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
