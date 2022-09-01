import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'tp_jounal_templates' })
export class JournalTemplateMongoEntity extends BaseMongoEntity<
  typeof JournalTemplateMongoEntity
> {
  @Prop({ required: true })
  template_name: string;
}

export const JournalTemplateSchema = SchemaFactory.createForClass(
  JournalTemplateMongoEntity,
);
export const JournalTemplateModel = [
  { name: JournalTemplateMongoEntity.name, schema: JournalTemplateSchema },
];

export type JournalTemplateDocument = JournalTemplateMongoEntity & Document;
