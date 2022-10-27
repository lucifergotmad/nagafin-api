import { Module } from "@nestjs/common";
import { TransactionLogRepositoryModule } from "./database/transaction-log.repository.module";
import { TransactionLogUseCaseModule } from "./use-cases/transaction-log.use-case.module";
import { TransactionLogController } from "./controller/transaction-log.controller";

@Module({
  imports: [TransactionLogUseCaseModule, TransactionLogRepositoryModule],
  controllers: [TransactionLogController],
})
export class TransactionLogModule {}
