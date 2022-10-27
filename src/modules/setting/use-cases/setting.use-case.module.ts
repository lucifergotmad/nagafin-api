import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { TransactionLogUseCaseModule } from "src/modules/transaction-log/use-cases/transaction-log.use-case.module";
import { settingUseCaseProvider } from "./setting.use-case.provider";

@Module({
  imports: [
    AccountRepositoryModule,
    SystemRepositoryModule,
    TransactionLogUseCaseModule,
  ],
  exports: settingUseCaseProvider,
  providers: settingUseCaseProvider,
})
export class SettingUseCaseModule {}
