import { Provider } from '@nestjs/common';
import { CreateCurrency } from './create-currency.use-case';

export const currencyUseCaseProvider: Provider[] = [CreateCurrency];
