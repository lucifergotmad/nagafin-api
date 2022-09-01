import {
  DbMapper,
  MongoEntityProps,
} from 'src/core/base-classes/domain/db-mapper';
import { JounalTemplateEntity } from '../../domain/jounal-template.entity';
import { JounalTemplateMongoEntity } from './jounal-template.mongo-entity';

export class JounalTemplateMongoMapper extends DbMapper<
  JounalTemplateEntity,
  JounalTemplateMongoEntity
> {
  protected toMongoProps(
    entity: JounalTemplateEntity,
  ): MongoEntityProps<JounalTemplateMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<JounalTemplateMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
