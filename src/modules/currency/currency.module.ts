import { Module } from '@nestjs/common';
import { CurrencyRepositoryModule } from './database/currency.repository.module';
import { CurrencyUseCaseModule } from './use-cases/currency.use-case.module';
import { CurrencyController } from './controller/currency.controller';

@Module({
  imports: [CurrencyUseCaseModule, CurrencyRepositoryModule],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
