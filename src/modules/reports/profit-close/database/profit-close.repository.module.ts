import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfitCloseModel } from "./model/profit-close.mongo-entity";
import { profitCloseRepositoryProvider } from "./profit-close.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(ProfitCloseModel)],
  providers: [profitCloseRepositoryProvider],
  exports: [profitCloseRepositoryProvider],
})
export class ProfitCloseRepositoryModule {}
