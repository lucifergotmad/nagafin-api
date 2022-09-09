import { Provider } from '@nestjs/common';
import { TrialBalanceReport } from './trial-balance-report.use-case';

export const trialBalanceUseCaseProvider: Provider[] = [TrialBalanceReport];
