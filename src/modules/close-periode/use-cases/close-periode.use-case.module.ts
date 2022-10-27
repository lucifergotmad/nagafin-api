import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { JournalRepositoryModule } from "src/modules/journal/database/journal.repository.module";
import { ProfitLossUseCaseModule } from "src/modules/reports/profit-loss/use-cases/profit-loss.use-case.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { closePeriodeUseCaseProvider } from "./close-periode.use-case.provider";

@Module({
  imports: [
    AccountRepositoryModule,
    JournalRepositoryModule,
    BalanceCardUseCaseModule,
    ProfitLossUseCaseModule,
    SystemRepositoryModule,
  ],
  exports: closePeriodeUseCaseProvider,
  providers: closePeriodeUseCaseProvider,
})
export class ClosePeriodeUseCaseModule {}
