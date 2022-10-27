import { Module } from "@nestjs/common";
import { ClosePeriodeUseCaseModule } from "./use-cases/close-periode.use-case.module";
import { ClosePeriodeController } from "./controller/close-periode.controller";

@Module({
  imports: [ClosePeriodeUseCaseModule],
  controllers: [ClosePeriodeController],
})
export class ClosePeriodeModule {}
