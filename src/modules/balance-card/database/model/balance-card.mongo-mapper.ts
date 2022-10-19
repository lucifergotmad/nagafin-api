import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { BalanceCardEntity } from "../../domain/balance-card.entity";
import { BalanceCardMongoEntity } from "./balance-card.mongo-entity";

export class BalanceCardMongoMapper extends DbMapper<
  BalanceCardEntity,
  BalanceCardMongoEntity
> {
  protected toMongoProps(
    entity: BalanceCardEntity,
  ): MongoEntityProps<BalanceCardMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<BalanceCardMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
