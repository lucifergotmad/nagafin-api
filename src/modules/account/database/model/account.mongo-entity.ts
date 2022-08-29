import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'tm_account' })
export class AccountMongoEntity extends BaseMongoEntity<
  typeof AccountMongoEntity
> {
  @Prop({ required: true, unique: true })
  acc_number: string;

  @Prop({ required: true })
  acc_name: string;

  @Prop({ required: true })
  acc_currency: string;

  @Prop({ required: true })
  acc_balance_type: string;

  @Prop({ required: true })
  acc_cashflow_type: string;

  @Prop({ required: true })
  acc_statement: string;

  @Prop({ required: true })
  acc_type: string;

  @Prop({ required: true, default: false })
  acc_active: boolean;

  @Prop({ default: '0' })
  acc_parents: string;

  @Prop()
  inputted_by?: string;

  @Prop()
  inputted_at?: Date;

  @Prop()
  edited_by?: string;

  @Prop()
  edited_at?: Date;

  @Prop()
  deleted_by?: string;

  @Prop()
  deleted_at?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountMongoEntity);
export const AccountModel = [
  { name: AccountMongoEntity.name, schema: AccountSchema },
];

export type AccountDocument = AccountMongoEntity & Document;
