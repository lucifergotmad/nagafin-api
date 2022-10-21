import { Module } from "@nestjs/common";
import { ProfitCloseRepositoryModule } from "./database/profit-close.repository.module";
import { ProfitCloseUseCaseModule } from "./use-cases/profit-close.use-case.module";
import { ProfitCloseController } from "./controller/profit-close.controller";

@Module({
  imports: [ProfitCloseUseCaseModule, ProfitCloseRepositoryModule],
  controllers: [ProfitCloseController],
})
export class ProfitCloseModule {}
