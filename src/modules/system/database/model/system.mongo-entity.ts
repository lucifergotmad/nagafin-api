import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'tp_systems' })
export class SystemMongoEntity extends BaseMongoEntity<
  typeof SystemMongoEntity
> {
  @Prop({ required: true })
  company_name: string;

  @Prop({ required: true })
  company_address: string;

  @Prop({ required: true })
  npwp: string;

  @Prop({ required: true })
  telephone_number: string;

  @Prop({ required: true })
  fax: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  website: string;

  @Prop({ required: false })
  retained_earnings_acc?: string;

  @Prop({ required: false })
  period_closing_date?: string;

  @Prop({ required: false })
  closed_by?: string;
}

export const SystemSchema = SchemaFactory.createForClass(SystemMongoEntity);
export const SystemModel = [
  { name: SystemMongoEntity.name, schema: SystemSchema },
];

export type SystemDocument = SystemMongoEntity & Document;
