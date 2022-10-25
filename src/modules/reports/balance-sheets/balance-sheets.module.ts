import { Module } from "@nestjs/common";
import { BalanceSheetsUseCaseModule } from "./use-cases/balance-sheets.use-case.module";
import { BalanceSheetsController } from "./controller/balance-sheets.controller";

@Module({
  imports: [BalanceSheetsUseCaseModule],
  controllers: [BalanceSheetsController],
})
export class BalanceSheetsModule {}
