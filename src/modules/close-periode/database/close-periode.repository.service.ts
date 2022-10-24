import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  ClosePeriodeMongoEntity,
  ClosePeriodeDocument,
} from "./model/close-periode.mongo-entity";
import { ClosePeriodeEntity } from "../domain/close-periode.entity";
import { ClosePeriodeRepositoryPort } from "./close-periode.repository.port";
import { ClosePeriodeMongoMapper } from "./model/close-periode.mongo-mapper";

@Injectable()
export class ClosePeriodeRepository
  extends BaseRepository<ClosePeriodeMongoEntity, ClosePeriodeEntity>
  implements ClosePeriodeRepositoryPort {
  constructor(
    @InjectModel(ClosePeriodeMongoEntity.name)
    private ClosePeriodeModel: Model<ClosePeriodeDocument>,
  ) {
    super(
      ClosePeriodeModel,
      new ClosePeriodeMongoMapper(ClosePeriodeEntity, ClosePeriodeMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
