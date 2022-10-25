import { Module } from "@nestjs/common";
import { SettingUseCaseModule } from "./use-cases/setting.use-case.module";
import { SettingController } from "./controller/setting.controller";

@Module({
  imports: [SettingUseCaseModule],
  controllers: [SettingController],
})
export class SettingModule {}
