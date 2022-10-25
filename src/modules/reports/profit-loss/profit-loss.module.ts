import { Module } from "@nestjs/common";
import { ProfitLossUseCaseModule } from "./use-cases/profit-loss.use-case.module";
import { ProfitLossController } from "./controller/profit-loss.controller";

@Module({
  imports: [ProfitLossUseCaseModule],
  controllers: [ProfitLossController],
})
export class ProfitLossModule {}
