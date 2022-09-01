import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'tp_jounal_templates' })
export class JounalTemplateMongoEntity extends BaseMongoEntity<
  typeof JounalTemplateMongoEntity
> {
  @Prop({ required: true })
  template_name: string;
}

export const JounalTemplateSchema = SchemaFactory.createForClass(
  JounalTemplateMongoEntity,
);
export const JounalTemplateModel = [
  { name: JounalTemplateMongoEntity.name, schema: JounalTemplateSchema },
];

export type JounalTemplateDocument = JounalTemplateMongoEntity & Document;
