import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { BalanceRepositoryModule } from "src/modules/balance/database/balance.repository.module";
import { ProfitLossUseCaseModule } from "../../profit-loss/use-cases/profit-loss.use-case.module";

import { balanceSheetsUseCaseProvider } from "./balance-sheets.use-case.provider";

@Module({
  imports: [
    AccountRepositoryModule,
    BalanceRepositoryModule,
    AccountRepositoryModule,
    BalanceCardUseCaseModule,
    ProfitLossUseCaseModule,
  ],
  exports: balanceSheetsUseCaseProvider,
  providers: balanceSheetsUseCaseProvider,
})
export class BalanceSheetsUseCaseModule {}
