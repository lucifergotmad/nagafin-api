import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { JournalReports } from "../use-cases/journal-reports.use-case";
import { JournalReportsRequestDTO } from "./dtos/journal-reports.request.dto";
import { JournalReportsResponse } from "./dtos/journal-reports.response";

@ControllerProperty("v1/journal-reports", "[Reports] Journal Reports")
export class JournalReportsController {
  constructor(private readonly journalReports: JournalReports) {}

  @SecureGet()
  @ApiOkResponse({ type: JournalReportsResponse, isArray: true })
  @APIQueryProperty(["start_date", "end_date"])
  journal(@Query() query: JournalReportsRequestDTO) {
    return this.journalReports.execute(query);
  }
}
