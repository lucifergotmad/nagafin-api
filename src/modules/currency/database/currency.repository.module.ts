import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CurrencyModel } from './model/currency.mongo-entity';
import { currencyRepositoryProvider } from './currency.repository.provider';

@Module({
  imports: [MongooseModule.forFeature(CurrencyModel)],
  providers: [currencyRepositoryProvider],
  exports: [currencyRepositoryProvider],
})
export class CurrencyRepositoryModule {}
