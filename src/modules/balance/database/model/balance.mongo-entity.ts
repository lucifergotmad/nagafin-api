import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

class BalanceDetailMongoEntity {
  @Prop({ required: true })
  credit_amount: number;

  @Prop({ required: true })
  debit_amount: number;
}

@Schema({ collection: 'tm_balances' })
export class BalanceMongoEntity extends BaseMongoEntity<
  typeof BalanceMongoEntity
> {
  @Prop({ required: true })
  balance_date: string;

  @Prop({ required: true })
  balance_acc: string;

  @Prop({ required: true, type: BalanceDetailMongoEntity })
  beginning_balance: BalanceDetailMongoEntity;

  @Prop({ required: true, type: BalanceDetailMongoEntity })
  balance_mutation: BalanceDetailMongoEntity;

  @Prop({ required: true, type: BalanceDetailMongoEntity })
  ending_balance: BalanceDetailMongoEntity;

  @Prop({ required: true })
  journal_number: string;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceMongoEntity);
export const BalanceModel = [
  { name: BalanceMongoEntity.name, schema: BalanceSchema },
];

export type BalanceDocument = BalanceMongoEntity & Document;
