import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { ClosePeriodeEntity } from "../../domain/close-periode.entity";
import { ClosePeriodeMongoEntity } from "./close-periode.mongo-entity";

export class ClosePeriodeMongoMapper extends DbMapper<
  ClosePeriodeEntity,
  ClosePeriodeMongoEntity
> {
  protected toMongoProps(
    entity: ClosePeriodeEntity,
  ): MongoEntityProps<ClosePeriodeMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<ClosePeriodeMongoEntity> = {
      // put field here
    };
    return mongoProps;
  }
}
