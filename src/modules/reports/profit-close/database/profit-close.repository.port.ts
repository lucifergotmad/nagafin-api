import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { ProfitCloseMongoEntity } from "./model/profit-close.mongo-entity";
import { ProfitCloseEntity } from "../domain/profit-close.entity";

export interface ProfitCloseRepositoryPort
  extends BaseRepositoryPort<ProfitCloseMongoEntity, ProfitCloseEntity> {
  __init__(): void;
}
