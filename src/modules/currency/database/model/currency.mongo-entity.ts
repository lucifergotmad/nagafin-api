import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseMongoEntity } from 'src/core/base-classes/infra/mongo-entity.base';

@Schema({ collection: 'currencies' })
export class CurrencyMongoEntity extends BaseMongoEntity<
  typeof CurrencyMongoEntity
> {
  // Put your schema here
}

export const CurrencySchema = SchemaFactory.createForClass(CurrencyMongoEntity);
export const CurrencyModel = [
  { name: CurrencyMongoEntity.name, schema: CurrencySchema },
];

export type CurrencyDocument = CurrencyMongoEntity & Document;
