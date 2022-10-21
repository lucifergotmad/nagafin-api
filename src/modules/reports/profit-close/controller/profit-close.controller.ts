import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { TrialBalanceReportRequestDTO } from "../../trial-balance/controller/dtos/trial-balance-report.request.dto";
import { ProfitCloseRepositoryPort } from "../database/profit-close.repository.port";
import { InjectProfitCloseRepository } from "../database/profit-close.repository.provider";
import { ProfitCloseReport } from "../use-cases/profit-close-report.usecase";
import { ProfitCloseResponse } from "./profit-close-response.dto";

@ControllerProperty("v1/profit-closes", "Profit Closes")
export class ProfitCloseController {
  constructor(private readonly profitCloseReport: ProfitCloseReport) {}
  @SecureGet("report")
  @ApiOkResponse({ type: TrialBalanceReportRequestDTO, isArray: true })
  @APIQueryProperty(["start_date", "end_date"])
  get(@Query() query: TrialBalanceReportRequestDTO) {
    try {
      return this.profitCloseReport.execute(query);
    } catch (error) {
      return {};
    }
  }
}
