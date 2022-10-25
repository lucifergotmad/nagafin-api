import { Module } from "@nestjs/common";
import { LedgerUseCaseModule } from "./use-cases/ledger.use-case.module";
import { LedgerController } from "./controller/ledger.controller";

@Module({
  imports: [LedgerUseCaseModule],
  controllers: [LedgerController],
})
export class LedgerModule {}
