import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardRepositoryModule } from "src/modules/balance-card/database/balance-card.repository.module";
import { ProfitLossUseCaseModule } from "../../profit-loss/use-cases/profit-loss.use-case.module";
import { cashFlowUseCaseProvider } from "./cash-flow.use-case.provider";

@Module({
  imports: [
    BalanceCardRepositoryModule,
    AccountRepositoryModule,
    ProfitLossUseCaseModule,
  ],
  exports: cashFlowUseCaseProvider,
  providers: cashFlowUseCaseProvider,
})
export class CashFlowUseCaseModule {}
