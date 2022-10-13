import {
  DbMapper,
  MongoEntityProps,
} from 'src/core/base-classes/domain/db-mapper';
import { JournalEntity } from '../../domain/journal.entity';
import { JournalMongoEntity } from './journal.mongo-entity';

export class JournalMongoMapper extends DbMapper<
  JournalEntity,
  JournalMongoEntity
> {
  protected toMongoProps(
    entity: JournalEntity,
  ): MongoEntityProps<JournalMongoEntity> {
    const props = entity.getPropsCopy();

    const mongoProps: MongoEntityProps<JournalMongoEntity> = {
      ...props,
    };
    return mongoProps;
  }
}
