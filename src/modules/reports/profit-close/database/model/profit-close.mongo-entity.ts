import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "profit-closes" })
export class ProfitCloseMongoEntity extends BaseMongoEntity<
  typeof ProfitCloseMongoEntity
> {
  // Put your schema here
}

export const ProfitCloseSchema = SchemaFactory.createForClass(
  ProfitCloseMongoEntity,
);
export const ProfitCloseModel = [
  { name: ProfitCloseMongoEntity.name, schema: ProfitCloseSchema },
];

export type ProfitCloseDocument = ProfitCloseMongoEntity & Document;
