import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "tt_balance_cards" })
export class BalanceCardMongoEntity extends BaseMongoEntity<
  typeof BalanceCardMongoEntity
> {
  @Prop({ required: true })
  balance_date: string;

  @Prop({ required: true })
  balance_acc: string;

  @Prop({ required: true })
  beginning_amount: number;

  @Prop({ required: true })
  mutation_amount: number;

  @Prop({ required: true })
  ending_amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  journal_number: string;

  @Prop({ required: false })
  created_by?: string;

  @Prop({ required: false })
  created_at?: Date;
}

export const BalanceCardSchema = SchemaFactory.createForClass(
  BalanceCardMongoEntity,
);
export const BalanceCardModel = [
  { name: BalanceCardMongoEntity.name, schema: BalanceCardSchema },
];

export type BalanceCardDocument = BalanceCardMongoEntity & Document;
