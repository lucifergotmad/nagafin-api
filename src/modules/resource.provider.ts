import { AccountModule } from './account/account.module';
import { AppAuthModule } from './app/app-auth.module';
import { BalanceModule } from './balance/balance.module';
import { CurrencyModule } from './currency/currency.module';
import { JournalTemplateModule } from './journal-template/journal-template.module';
import { JournalModule } from './journal/journal.module';
import { BalanceSheetsModule } from './reports/balance-sheets/balance-sheets.module';
import { CashFlowModule } from './reports/cash-flow/cash-flow.module';
import { JournalReportsModule } from './reports/journal-reports/journal-reports.module';
import { LedgerModule } from './reports/ledger/ledger.module';
import { TrialBalanceModule } from './reports/trial-balance/trial-balance.module';
import { UserModule } from './user/user.module';

const systemProviders = [AppAuthModule, UserModule];

export const resourceProviders = [
  ...systemProviders,
  AccountModule,
  CurrencyModule,
  JournalModule,
  JournalTemplateModule,
  BalanceModule,
  JournalReportsModule,
  LedgerModule,
  BalanceSheetsModule,
  TrialBalanceModule,
  CashFlowModule,
];
