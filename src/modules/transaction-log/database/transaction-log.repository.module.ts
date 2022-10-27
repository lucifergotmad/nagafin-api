import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TransactionLogModel } from "./model/transaction-log.mongo-entity";
import { transactionLogRepositoryProvider } from "./transaction-log.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(TransactionLogModel)],
  providers: [transactionLogRepositoryProvider],
  exports: [transactionLogRepositoryProvider],
})
export class TransactionLogRepositoryModule {}
