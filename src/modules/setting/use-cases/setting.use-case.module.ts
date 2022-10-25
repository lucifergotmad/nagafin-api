import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { settingUseCaseProvider } from "./setting.use-case.provider";

@Module({
  imports: [AccountRepositoryModule, SystemRepositoryModule],
  exports: settingUseCaseProvider,
  providers: settingUseCaseProvider,
})
export class SettingUseCaseModule {}
