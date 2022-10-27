import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { TransactionLogMongoEntity } from "./model/transaction-log.mongo-entity";
import { TransactionLogEntity } from "../domain/transaction-log.entity";

export interface TransactionLogRepositoryPort
  extends BaseRepositoryPort<TransactionLogMongoEntity, TransactionLogEntity> {
  __init__(): void;
}
