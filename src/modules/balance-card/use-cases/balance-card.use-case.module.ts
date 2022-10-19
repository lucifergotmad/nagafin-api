import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardRepositoryModule } from "../database/balance-card.repository.module";
import { balanceCardUseCaseProvider } from "./balance-card.use-case.provider";

@Module({
  imports: [BalanceCardRepositoryModule, AccountRepositoryModule],
  exports: balanceCardUseCaseProvider,
  providers: balanceCardUseCaseProvider,
})
export class BalanceCardUseCaseModule {}
