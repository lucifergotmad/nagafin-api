import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

class BalanceDetailMongoEntity {
  @Prop({ required: true })
  credit_amount: number;

  @Prop({ required: true })
  debit_amount: number;
}

class BalanceMutationMongoEntity {
  @Prop({ required: true })
  credit_amount_in: number;

  @Prop({ required: true })
  debit_amount_in: number;

  @Prop({ required: true })
  credit_amount_out: number;

  @Prop({ required: true })
  debit_amount_out: number;
}

@Schema({ collection: 'balances' })
export class BalanceMongoEntity extends BaseMongoEntity<
  typeof BalanceMongoEntity
> {
  @Prop({ required: true })
  balance_date: string;

  @Prop({ required: true })
  balance_acc: string;

  @Prop({ required: true, type: BalanceDetailMongoEntity })
  beginning_balance: BalanceDetailMongoEntity;

  @Prop({ required: true, type: BalanceMutationMongoEntity })
  balance_mutation: BalanceMutationMongoEntity;

  @Prop({ required: true, type: BalanceDetailMongoEntity })
  ending_balance: BalanceDetailMongoEntity;
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceMongoEntity);
export const BalanceModel = [
  { name: BalanceMongoEntity.name, schema: BalanceSchema },
];

export type BalanceDocument = BalanceMongoEntity & Document;
