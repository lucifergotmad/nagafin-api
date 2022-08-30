import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'balances' })
export class BalanceMongoEntity extends BaseMongoEntity<
  typeof BalanceMongoEntity
> {
  // Put your schema here
}

export const BalanceSchema = SchemaFactory.createForClass(BalanceMongoEntity);
export const BalanceModel = [
  { name: BalanceMongoEntity.name, schema: BalanceSchema },
];

export type BalanceDocument = BalanceMongoEntity & Document;
