import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tm_currencies" })
export class CurrencyMongoEntity extends BaseMongoEntity<
  typeof CurrencyMongoEntity
> {
  @Prop({ required: true, unique: true })
  currency_code: string;

  @Prop({ required: true })
  currency_name: string;

  @Prop({ required: true, default: 1 })
  exchange_rate: number;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;

  @Prop({ required: false })
  updated_by?: string;

  @Prop({ required: false })
  updated_at?: Date;
}

export const CurrencySchema = SchemaFactory.createForClass(CurrencyMongoEntity);
export const CurrencyModel = [
  { name: CurrencyMongoEntity.name, schema: CurrencySchema },
];

export type CurrencyDocument = CurrencyMongoEntity & Document;
