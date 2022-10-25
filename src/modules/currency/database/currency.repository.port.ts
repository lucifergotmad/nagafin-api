import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { CurrencyMongoEntity } from "./model/currency.mongo-entity";
import { CurrencyEntity } from "../domain/currency.entity";

export interface CurrencyRepositoryPort
  extends BaseRepositoryPort<CurrencyMongoEntity, CurrencyEntity> {
  __init__(): void;
}
