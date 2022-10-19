import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BalanceModel } from "./model/balance.mongo-entity";
import { balanceRepositoryProvider } from "./balance.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(BalanceModel)],
  providers: [balanceRepositoryProvider],
  exports: [balanceRepositoryProvider],
})
export class BalanceRepositoryModule {}
