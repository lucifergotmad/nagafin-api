import { Provider } from '@nestjs/common';
import { BalanceReport } from './balance-report.use-case';
import { LedgerReport } from './ledger-report.use-case';
import { ProfitLossReport } from './profit-loss-report.use-case';
import { TrialBalanceReport } from './trial-balance-report.use-case';

export const balanceUseCaseProvider: Provider[] = [
  LedgerReport,
  TrialBalanceReport,
  ProfitLossReport,
  BalanceReport,
];
