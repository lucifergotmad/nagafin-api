import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "./database/account.repository.module";
import { AccountUseCaseModule } from "./use-cases/account.use-case.module";
import { AccountController } from "./controller/account.controller";

@Module({
  imports: [AccountUseCaseModule, AccountRepositoryModule],
  controllers: [AccountController],
})
export class AccountModule {}
