import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'journals' })
export class JournalMongoEntity extends BaseMongoEntity<
  typeof JournalMongoEntity
> {
  // Put your schema here
}

export const JournalSchema = SchemaFactory.createForClass(JournalMongoEntity);
export const JournalModel = [
  { name: JournalMongoEntity.name, schema: JournalSchema },
];

export type JournalDocument = JournalMongoEntity & Document;
