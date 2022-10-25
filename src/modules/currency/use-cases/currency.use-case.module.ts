import { Module } from "@nestjs/common";
import { CurrencyRepositoryModule } from "../database/currency.repository.module";
import { currencyUseCaseProvider } from "./currency.use-case.provider";

@Module({
  imports: [CurrencyRepositoryModule],
  exports: currencyUseCaseProvider,
  providers: currencyUseCaseProvider,
})
export class CurrencyUseCaseModule {}
