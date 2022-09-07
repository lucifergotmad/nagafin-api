import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { LedgerReport } from '../use-cases/ledger-report.use-case';
import { ProfitLossReport } from '../use-cases/profit-loss-report.use-case';
import { TrialBalanceReport } from '../use-cases/trial-balance-report.use-case';
import {
  LedgerReportResponse,
  ProfitLossReportResponse,
  TrialBalanceReportResponse,
} from './dtos/balance.response';
import { LedgerReportRequestDTO } from './dtos/ledger-report.request.dto';
import { ProfitLossReportRequestDTO } from './dtos/profit-loss-report.request.dto';
import { TrialBalanceReportRequestDTO } from './dtos/trial-balance-report.request.dto';

@ControllerProperty('v1/balances', '[Master] Balances')
export class BalanceController {
  constructor(
    private readonly ledgerReport: LedgerReport,
    private readonly trialBalanceReport: TrialBalanceReport,
    private readonly profitLossReport: ProfitLossReport,
  ) {}

  @SecureGet('report/ledger')
  @ApiOkResponse({ type: LedgerReportResponse, isArray: true })
  @APIQueryProperty(['acc_number', 'start_date', 'end_date'])
  ledger(@Query() query: LedgerReportRequestDTO) {
    return this.ledgerReport.execute(query);
  }

  @SecureGet('report/trial-balance')
  @ApiOkResponse({ type: TrialBalanceReportResponse, isArray: true })
  @APIQueryProperty(['start_date', 'end_date'])
  trialBalance(@Query() query: TrialBalanceReportRequestDTO) {
    return this.trialBalanceReport.execute(query);
  }

  @SecureGet('report/profit-loss')
  @ApiOkResponse({ type: ProfitLossReportResponse, isArray: true })
  @APIQueryProperty(['start_date', 'end_date'])
  profitLoss(@Query() query: ProfitLossReportRequestDTO) {
    return this.profitLossReport.execute(query);
  }
}
