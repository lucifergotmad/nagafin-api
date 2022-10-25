import { Module } from "@nestjs/common";
import { CashFlowUseCaseModule } from "./use-cases/cash-flow.use-case.module";
import { CashFlowController } from "./controller/cash-flow.controller";

@Module({
  imports: [CashFlowUseCaseModule],
  controllers: [CashFlowController],
})
export class CashFlowModule {}
