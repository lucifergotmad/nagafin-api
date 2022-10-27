import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "th_transaction_logs" })
export class TransactionLogMongoEntity extends BaseMongoEntity<
  typeof TransactionLogMongoEntity
> {
  @Prop({ required: true })
  transaction_name: string;

  @Prop({ required: true })
  transaction_date: string;

  @Prop({ required: false })
  transaction_detail?: string;

  @Prop({ required: true })
  created_by: string;

  @Prop({ required: true })
  created_at: Date;
}

export const TransactionLogSchema = SchemaFactory.createForClass(
  TransactionLogMongoEntity,
);
export const TransactionLogModel = [
  { name: TransactionLogMongoEntity.name, schema: TransactionLogSchema },
];

export type TransactionLogDocument = TransactionLogMongoEntity & Document;
