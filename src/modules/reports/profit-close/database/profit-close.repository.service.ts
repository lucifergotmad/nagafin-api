import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  ProfitCloseMongoEntity,
  ProfitCloseDocument,
} from "./model/profit-close.mongo-entity";
import { ProfitCloseEntity } from "../domain/profit-close.entity";
import { ProfitCloseRepositoryPort } from "./profit-close.repository.port";
import { ProfitCloseMongoMapper } from "./model/profit-close.mongo-mapper";

@Injectable()
export class ProfitCloseRepository
  extends BaseRepository<ProfitCloseMongoEntity, ProfitCloseEntity>
  implements ProfitCloseRepositoryPort {
  constructor(
    @InjectModel(ProfitCloseMongoEntity.name)
    private ProfitCloseModel: Model<ProfitCloseDocument>,
  ) {
    super(
      ProfitCloseModel,
      new ProfitCloseMongoMapper(ProfitCloseEntity, ProfitCloseMongoEntity),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
