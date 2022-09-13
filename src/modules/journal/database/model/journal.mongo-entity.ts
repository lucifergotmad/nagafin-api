import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

export class JournalDetailMongoEntity {
  @Prop({ required: true })
  acc_number: string;

  @Prop({ required: true, default: 0 })
  credit_amount: number;

  @Prop({ required: true, default: 0 })
  debit_amount: number;

  @Prop({ required: true })
  journal_info: string;
}

@Schema({ collection: 'tt_journals' })
export class JournalMongoEntity extends BaseMongoEntity<
  typeof JournalMongoEntity
> {
  @Prop({ required: true, unique: true })
  journal_number: string;

  @Prop({ required: true })
  journal_notes: string;

  @Prop({ required: true })
  journal_date: string;

  @Prop({ required: true, default: 0 })
  total_credit_amount: number;

  @Prop({ required: true, default: 0 })
  total_debit_amount: number;

  @Prop(raw([JournalDetailMongoEntity]))
  journal_detail: Array<JournalDetailMongoEntity>;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;

  @Prop({ required: false })
  updated_by?: string;

  @Prop({ required: false })
  updated_at?: Date;
}

export const JournalSchema = SchemaFactory.createForClass(JournalMongoEntity);
export const JournalModel = [
  { name: JournalMongoEntity.name, schema: JournalSchema },
];

export type JournalDocument = JournalMongoEntity & Document;
