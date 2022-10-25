import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountModel } from "./model/account.mongo-entity";
import { accountRepositoryProvider } from "./account.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(AccountModel)],
  providers: [accountRepositoryProvider],
  exports: [accountRepositoryProvider],
})
export class AccountRepositoryModule {}
