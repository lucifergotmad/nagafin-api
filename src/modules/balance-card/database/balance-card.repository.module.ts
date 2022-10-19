import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BalanceCardModel } from "./model/balance-card.mongo-entity";
import { balanceCardRepositoryProvider } from "./balance-card.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(BalanceCardModel)],
  providers: [balanceCardRepositoryProvider],
  exports: [balanceCardRepositoryProvider],
})
export class BalanceCardRepositoryModule {}
