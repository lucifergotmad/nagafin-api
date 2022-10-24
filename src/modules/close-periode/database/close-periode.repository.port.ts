import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { ClosePeriodeMongoEntity } from "./model/close-periode.mongo-entity";
import { ClosePeriodeEntity } from "../domain/close-periode.entity";

export interface ClosePeriodeRepositoryPort
  extends BaseRepositoryPort<ClosePeriodeMongoEntity, ClosePeriodeEntity> {
  __init__(): void;
}
