import {
  DbMapper,
  MongoEntityProps,
} from "src/core/base-classes/domain/db-mapper";
import { JournalTemplateEntity } from "../../domain/jounal-template.entity";
import { JournalTemplateMongoEntity } from "./journal-template.mongo-entity";

export class JournalTemplateMongoMapper extends DbMapper<
  JournalTemplateEntity,
  JournalTemplateMongoEntity
> {
  protected toMongoProps(
    entity: JournalTemplateEntity,
  ): MongoEntityProps<JournalTemplateMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<JournalTemplateMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
