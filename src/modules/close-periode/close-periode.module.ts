import { Module } from "@nestjs/common";
import { ClosePeriodeRepositoryModule } from "./database/close-periode.repository.module";
import { ClosePeriodeUseCaseModule } from "./use-cases/close-periode.use-case.module";
import { ClosePeriodeController } from "./controller/close-periode.controller";

@Module({
  imports: [ClosePeriodeUseCaseModule, ClosePeriodeRepositoryModule],
  controllers: [ClosePeriodeController],
})
export class ClosePeriodeModule {}
