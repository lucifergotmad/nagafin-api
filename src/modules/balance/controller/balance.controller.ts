import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { BalanceReport } from '../use-cases/balance-report.use-case';
import { LedgerReport } from '../use-cases/ledger-report.use-case';
import { ProFormaReport } from '../use-cases/pro-forma-report.use-case';
import { ProfitLossReport } from '../use-cases/profit-loss-report.use-case';
import { TrialBalanceReport } from '../use-cases/trial-balance-report.use-case';
import { BalanceReportRequestDTO } from './dtos/balance-report.request.dto';
import {
  BalanceReportResponse,
  LedgerReportResponse,
  ProfitLossReportResponse,
  ProFormaReportResponse,
  TrialBalanceReportResponse,
} from './dtos/balance.response';
import { LedgerReportRequestDTO } from './dtos/ledger-report.request.dto';
import { ProFormaReportRequestDTO } from './dtos/pro-forma-report.request.dto';
import { ProfitLossReportRequestDTO } from './dtos/profit-loss-report.request.dto';
import { TrialBalanceReportRequestDTO } from './dtos/trial-balance-report.request.dto';

@ControllerProperty('v1/balances', '[Master] Balances')
export class BalanceController {
  constructor(
    private readonly ledgerReport: LedgerReport,
    private readonly trialBalanceReport: TrialBalanceReport,
    private readonly profitLossReport: ProfitLossReport,
    private readonly balanceReport: BalanceReport,
    private readonly proFormaReport: ProFormaReport,
  ) {}

  @SecureGet('report')
  @ApiOkResponse({ type: BalanceReportResponse, isArray: true })
  @APIQueryProperty(['transaction_date'])
  balance(@Query() query: BalanceReportRequestDTO) {
    return this.balanceReport.execute(query);
  }

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

  @SecureGet('report/pro-forma')
  @ApiOkResponse({ type: ProFormaReportResponse })
  @APIQueryProperty(['transaction_date'])
  proForma(@Query() query: ProFormaReportRequestDTO) {
    return this.proFormaReport.execute(query);
  }
}
