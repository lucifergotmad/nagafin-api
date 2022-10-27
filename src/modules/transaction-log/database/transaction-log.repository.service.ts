import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  TransactionLogMongoEntity,
  TransactionLogDocument,
} from "./model/transaction-log.mongo-entity";
import { TransactionLogEntity } from "../domain/transaction-log.entity";
import { TransactionLogRepositoryPort } from "./transaction-log.repository.port";
import { TransactionLogMongoMapper } from "./model/transaction-log.mongo-mapper";

@Injectable()
export class TransactionLogRepository
  extends BaseRepository<TransactionLogMongoEntity, TransactionLogEntity>
  implements TransactionLogRepositoryPort {
  constructor(
    @InjectModel(TransactionLogMongoEntity.name)
    private TransactionLogModel: Model<TransactionLogDocument>,
  ) {
    super(
      TransactionLogModel,
      new TransactionLogMongoMapper(
        TransactionLogEntity,
        TransactionLogMongoEntity,
      ),
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
