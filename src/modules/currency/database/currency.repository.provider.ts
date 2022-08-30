import { Inject, Provider } from '@nestjs/common';
import { CurrencyRepository } from './currency.repository.service';

export const InjectCurrencyRepository = Inject(CurrencyRepository.name);

export const currencyRepositoryProvider: Provider = {
  provide: CurrencyRepository.name,
  useClass: CurrencyRepository,
};
