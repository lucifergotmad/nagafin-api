import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tm_accounts" })
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

  @Prop({ required: true, default: "none" })
  acc_cashflow_type?: string;

  @Prop({ required: true })
  acc_statement: string;

  @Prop({ required: true })
  acc_type: string;

  @Prop({ required: true, default: false })
  acc_active: boolean;

  @Prop({ required: true, default: "0" })
  acc_parents: string;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;

  @Prop({ required: false })
  updated_by?: string;

  @Prop({ required: false })
  updated_at?: Date;
}

export const AccountSchema = SchemaFactory.createForClass(AccountMongoEntity);
export const AccountModel = [
  { name: AccountMongoEntity.name, schema: AccountSchema },
];

export type AccountDocument = AccountMongoEntity & Document;
