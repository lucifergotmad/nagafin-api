import { Query } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { APIQueryProperty } from 'src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { BalanceSheetsReport } from '../use-cases/balance-sheets-report.use-case';
import { BalanceSheetsReportRequestDTO } from './dtos/balance-sheets.request.dto';
import { BalanceSheetsReportResponse } from './dtos/balance-sheets.response';

@ControllerProperty('v1/balance-sheets', 'Balance Sheets')
export class BalanceSheetsController {
  constructor(private readonly balanceSheetsReport: BalanceSheetsReport) {}

  @SecureGet('report')
  @ApiOkResponse({ type: BalanceSheetsReportResponse, isArray: true })
  @APIQueryProperty(['transaction_date'])
  balanceSheets(@Query() query: BalanceSheetsReportRequestDTO) {
    return this.balanceSheetsReport.execute(query);
  }
}
