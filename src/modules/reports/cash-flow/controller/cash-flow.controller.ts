import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { CashFlowReport } from '../use-cases/cash-flow-report.use-case';
import { CashFlowReportRequestDTO } from './dtos/cash-flow.request.dto';
import { CashFlowReportResponse } from './dtos/cash-flow.response';

@ControllerProperty('v1/cash-flows', '[Report] Cash Flows')
export class CashFlowController {
  constructor(private readonly cashFlowReport: CashFlowReport) {}

  @SecureGet('report')
  @ApiOkResponse({ type: CashFlowReportResponse })
  @APIQueryProperty(['start_date', 'end_date'])
  cashFlow(@Query() query: CashFlowReportRequestDTO) {
    return this.cashFlowReport.execute(query);
  }
}
