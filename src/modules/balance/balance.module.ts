import { Module } from "@nestjs/common";
import { BalanceRepositoryModule } from "./database/balance.repository.module";

@Module({
  imports: [BalanceRepositoryModule],
  controllers: [],
})
export class BalanceModule {}
