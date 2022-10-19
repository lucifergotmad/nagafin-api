import { Module } from "@nestjs/common";
import { BalanceCardRepositoryModule } from "./database/balance-card.repository.module";
import { BalanceCardUseCaseModule } from "./use-cases/balance-card.use-case.module";

@Module({
  imports: [BalanceCardUseCaseModule, BalanceCardRepositoryModule],
  controllers: [],
})
export class BalanceCardModule {}
