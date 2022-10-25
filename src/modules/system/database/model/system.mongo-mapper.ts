import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { SystemEntity } from "../../domain/system.entity";
import { SystemMongoEntity } from "./system.mongo-entity";

export class SystemMongoMapper extends DbMapper<
  SystemEntity,
  SystemMongoEntity
> {
  protected toMongoProps(
    entity: SystemEntity,
  ): MongoEntityProps<SystemMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<SystemMongoEntity> = {
      ...props,
      telephone_number: props.telephone_number.value,
      email: props.email.value,
    };
    return mongoProps;
  }
}
