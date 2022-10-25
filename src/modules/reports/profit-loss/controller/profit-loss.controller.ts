import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { TrialBalanceReportRequestDTO } from "../../trial-balance/controller/dtos/trial-balance-report.request.dto";
import { ProfitLossReport } from "../use-cases/profit-loss-report.usecase";
import { ProfitCloseResponse } from "./profit-loss-response.dto";

@ControllerProperty("v1/profit-loss", "Profit Loss")
export class ProfitLossController {
  constructor(private readonly profitCloseReport: ProfitLossReport) {}
  @SecureGet("report")
  @ApiOkResponse({ type: ProfitCloseResponse, isArray: true })
  @APIQueryProperty(["start_date", "end_date"])
  get(@Query() query: TrialBalanceReportRequestDTO) {
    return this.profitCloseReport.execute(query);
  }
}
