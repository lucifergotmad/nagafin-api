import { AccountModule } from './account/account.module';
import { AppAuthModule } from './app/app-auth.module';
import { CurrencyModule } from './currency/currency.module';
import { UserModule } from './user/user.module';

const systemProviders = [AppAuthModule, UserModule];

export const resourceProviders = [
  ...systemProviders,
  AccountModule,
  CurrencyModule,
];
