import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';
import { JournalDetailMongoEntity } from 'src/modules/journal/database/model/journal.mongo-entity';

@Schema({ collection: 'tm_journal_templates' })
export class JournalTemplateMongoEntity extends BaseMongoEntity<
  typeof JournalTemplateMongoEntity
> {
  @Prop({ required: true })
  template_name: string;

  @Prop({ required: true })
  template_desc: string;

  @Prop({ required: true })
  journal_notes: string;

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

export const JournalTemplateSchema = SchemaFactory.createForClass(
  JournalTemplateMongoEntity,
);
export const JournalTemplateModel = [
  { name: JournalTemplateMongoEntity.name, schema: JournalTemplateSchema },
];

export type JournalTemplateDocument = JournalTemplateMongoEntity & Document;
