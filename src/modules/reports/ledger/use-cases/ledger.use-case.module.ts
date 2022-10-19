import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardRepositoryModule } from "src/modules/balance-card/database/balance-card.repository.module";
import { JournalRepositoryModule } from "src/modules/journal/database/journal.repository.module";
import { ledgerUseCaseProvider } from "./ledger.use-case.provider";

@Module({
  imports: [
    JournalRepositoryModule,
    BalanceCardRepositoryModule,
    AccountRepositoryModule,
  ],
  exports: ledgerUseCaseProvider,
  providers: ledgerUseCaseProvider,
})
export class LedgerUseCaseModule {}
