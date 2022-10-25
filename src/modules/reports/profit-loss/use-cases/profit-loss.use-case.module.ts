import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { profitLossUseCaseProvider } from "./profit-loss.use-case.provider";

@Module({
  imports: [AccountRepositoryModule, BalanceCardUseCaseModule],
  exports: profitLossUseCaseProvider,
  providers: profitLossUseCaseProvider,
})
export class ProfitLossUseCaseModule {}
