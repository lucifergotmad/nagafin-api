import { AccountModule } from './account/account.module';
import { AppAuthModule } from './app/app-auth.module';
import { BalanceModule } from './balance/balance.module';
import { CurrencyModule } from './currency/currency.module';
import { JournalTemplateModule } from './journal-template/journal-template.module';
import { JournalModule } from './journal/journal.module';
import { BalanceSheetsModule } from './reports/balance-sheets/balance-sheets.module';
import { CashFlowReport } from './reports/cash-flow/use-cases/cash-flow-report.use-case';
import { JournalReportsModule } from './reports/journal-reports/journal-reports.module';
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
  BalanceSheetsModule,
  TrialBalanceModule,
  CashFlowReport,
];
