import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { BalanceRepositoryModule } from "src/modules/balance/database/balance.repository.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { JournalRepositoryModule } from "../database/journal.repository.module";
import { journalUseCaseProvider } from "./journal.use-case.provider";

@Module({
  imports: [
    JournalRepositoryModule,
    BalanceRepositoryModule,
    AccountRepositoryModule,
    SystemRepositoryModule,
    BalanceCardUseCaseModule,
  ],
  exports: journalUseCaseProvider,
  providers: journalUseCaseProvider,
})
export class JournalUseCaseModule {}
