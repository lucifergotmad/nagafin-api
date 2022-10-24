import { Module } from "@nestjs/common";
import { AccountRepositoryModule } from "src/modules/account/database/account.repository.module";
import { BalanceCardUseCaseModule } from "src/modules/balance-card/use-cases/balance-card.use-case.module";
import { ProfitCloseUseCaseModule } from "src/modules/reports/profit-close/use-cases/profit-close.use-case.module";
import { SystemRepositoryModule } from "src/modules/system/database/system.repository.module";
import { ClosePeriodeRepositoryModule } from "../database/close-periode.repository.module";
import { closePeriodeUseCaseProvider } from "./close-periode.use-case.provider";

@Module({
  imports: [
    ClosePeriodeRepositoryModule,
    AccountRepositoryModule,
    BalanceCardUseCaseModule,
    ProfitCloseUseCaseModule,
    SystemRepositoryModule,
  ],
  exports: closePeriodeUseCaseProvider,
  providers: closePeriodeUseCaseProvider,
})
export class ClosePeriodeUseCaseModule {}
