import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { TrialBalanceReport } from '../use-cases/trial-balance-report.use-case';
import { TrialBalanceReportRequestDTO } from './dtos/trial-balance-report.request.dto';
import { TrialBalanceReportResponse } from './dtos/trial-balance.response';

@ControllerProperty('v1/trial-balances', '[Report] Trial Balances')
export class TrialBalanceController {
  constructor(private readonly trialBalanceReport: TrialBalanceReport) {}

  @SecureGet('report')
  @ApiOkResponse({ type: TrialBalanceReportResponse, isArray: true })
  @APIQueryProperty(['start_date', 'end_date'])
  trialBalance(@Query() query: TrialBalanceReportRequestDTO) {
    return this.trialBalanceReport.execute(query);
  }
}
