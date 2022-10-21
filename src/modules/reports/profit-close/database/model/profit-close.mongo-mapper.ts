import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { ProfitCloseEntity } from "../../domain/profit-close.entity";
import { ProfitCloseMongoEntity } from "./profit-close.mongo-entity";

export class ProfitCloseMongoMapper extends DbMapper<
  ProfitCloseEntity,
  ProfitCloseMongoEntity
> {
  protected toMongoProps(
    entity: ProfitCloseEntity,
  ): MongoEntityProps<ProfitCloseMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<ProfitCloseMongoEntity> = {
      // put field here
    };
    return mongoProps;
  }
}
