import { Provider } from '@nestjs/common';
import { CashFlowReport } from './cash-flow-report.use-case';

export const cashFlowUseCaseProvider: Provider[] = [CashFlowReport];
