import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardRepositoryModule } from "src/modules/balance-card/database/balance-card.repository.module";
import { ProfitCloseRepositoryModule } from "../../profit-close/database/profit-close.repository.module";
import { ProfitCloseUseCaseModule } from "../../profit-close/use-cases/profit-close.use-case.module";
import { cashFlowUseCaseProvider } from "./cash-flow.use-case.provider";

@Module({
  imports: [
    BalanceCardRepositoryModule,
    AccountRepositoryModule,
    ProfitCloseUseCaseModule,
  ],
  exports: cashFlowUseCaseProvider,
  providers: cashFlowUseCaseProvider,
})
export class CashFlowUseCaseModule {}
