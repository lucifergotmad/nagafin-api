import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardRepositoryModule } from "src/modules/balance-card/database/balance-card.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { ProfitCloseRepositoryModule } from "../database/profit-close.repository.module";
import { profitCloseUseCaseProvider } from "./profit-close.use-case.provider";

@Module({
  imports: [
    ProfitCloseRepositoryModule,
    AccountRepositoryModule,
    BalanceCardUseCaseModule,
  ],
  exports: profitCloseUseCaseProvider,
  providers: profitCloseUseCaseProvider,
})
export class ProfitCloseUseCaseModule {}
