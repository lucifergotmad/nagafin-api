import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { LedgerReport } from '../use-cases/ledger-report.use-case';
import { LedgerReportResponse } from './dtos/balance.response';
import { LedgerReportRequestDTO } from './dtos/ledger-report.request.dto';

@ControllerProperty('v1/balances', '[Master] Balances')
export class BalanceController {
  constructor(private readonly ledgerReport: LedgerReport) {}

  @SecureGet('report/ledger')
  @ApiOkResponse({ type: LedgerReportResponse, isArray: true })
  @APIQueryProperty(['acc_number', 'start_date', 'end_date'])
  ledger(@Query() query: LedgerReportRequestDTO) {
    return this.ledgerReport.execute(query);
  }
}
