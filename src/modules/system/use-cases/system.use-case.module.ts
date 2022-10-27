import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { TransactionLogUseCaseModule } from "src/modules/transaction-log/use-cases/transaction-log.use-case.module";
import { SystemRepositoryModule } from "../database/system.repository.module";
import { systemUseCaseProvider } from "./system.use-case.provider";

@Module({
  imports: [
    SystemRepositoryModule,
    AccountRepositoryModule,
    TransactionLogUseCaseModule,
  ],
  exports: systemUseCaseProvider,
  providers: systemUseCaseProvider,
})
export class SystemUseCaseModule {}
