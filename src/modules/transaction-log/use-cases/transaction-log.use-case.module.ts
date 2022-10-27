import { Module } from "@nestjs/common";
import { TransactionLogRepositoryModule } from "../database/transaction-log.repository.module";
import { transactionLogUseCaseProvider } from "./transaction-log.use-case.provider";

@Module({
  imports: [TransactionLogRepositoryModule],
  exports: transactionLogUseCaseProvider,
  providers: transactionLogUseCaseProvider,
})
export class TransactionLogUseCaseModule {}
