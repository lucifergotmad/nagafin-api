import { Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { FindTransactionLog } from "../use-cases/find-transaction-log.use-case";
import { FindTransactionLogRequestDTO } from "./dtos/find-transaction-log.request.dto";
import { TransactionLogResponse } from "./dtos/transaction-log.response.dto";

@ControllerProperty("v1/transaction-logs", "[History] Transaction Logs")
export class TransactionLogController {
  constructor(private readonly findTransactionLog: FindTransactionLog) {}

  @SecureGet()
  @ApiOkResponse({ type: TransactionLogResponse, isArray: true })
  @APIQueryProperty(["start_date", "end_date", "transaction_type"])
  find(@Query() query: FindTransactionLogRequestDTO) {
    return this.findTransactionLog.execute(query);
  }
}
