import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { trialBalanceUseCaseProvider } from "./trial-balance.use-case.provider";

@Module({
  imports: [AccountRepositoryModule, BalanceCardUseCaseModule],
  exports: trialBalanceUseCaseProvider,
  providers: trialBalanceUseCaseProvider,
})
export class TrialBalanceUseCaseModule {}
