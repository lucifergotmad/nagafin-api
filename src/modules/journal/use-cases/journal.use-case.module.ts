import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { TransactionLogUseCaseModule } from "src/modules/transaction-log/use-cases/transaction-log.use-case.module";
import { JournalRepositoryModule } from "../database/journal.repository.module";
import { journalUseCaseProvider } from "./journal.use-case.provider";

@Module({
  imports: [
    JournalRepositoryModule,
    AccountRepositoryModule,
    SystemRepositoryModule,
    TransactionLogUseCaseModule,
    BalanceCardUseCaseModule,
  ],
  exports: journalUseCaseProvider,
  providers: journalUseCaseProvider,
})
export class JournalUseCaseModule {}
