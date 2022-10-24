import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { BaseMongoEntity } from "src/core/base-classes/infra/mongo-entity.base";

@Schema({ collection: "close-periodes" })
export class ClosePeriodeMongoEntity extends BaseMongoEntity<
  typeof ClosePeriodeMongoEntity
> {
  // Put your schema here
}

export const ClosePeriodeSchema = SchemaFactory.createForClass(
  ClosePeriodeMongoEntity,
);
export const ClosePeriodeModel = [
  { name: ClosePeriodeMongoEntity.name, schema: ClosePeriodeSchema },
];

export type ClosePeriodeDocument = ClosePeriodeMongoEntity & Document;
