import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { LedgerReport } from '../use-cases/ledger-report.use-case';
import { LedgerReportRequestDTO } from './dtos/ledger.request.dto';
import { LedgerReportResponse } from './dtos/ledger.response';

@ControllerProperty('v1/ledgers', '[Report] Ledgers')
export class LedgerController {
  constructor(private readonly ledgerReport: LedgerReport) {}

  @SecureGet('report')
  @ApiOkResponse({ type: LedgerReportResponse, isArray: true })
  @APIQueryProperty(['start_date', 'end_date', 'acc_number'])
  trialBalance(@Query() query: LedgerReportRequestDTO) {
    return this.ledgerReport.execute(query);
  }
}
