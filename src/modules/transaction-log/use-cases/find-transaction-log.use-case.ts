import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { FindTransactionLogRequestDTO } from "../controller/dtos/find-transaction-log.request.dto";
import { TransactionLogResponse } from "../controller/dtos/transaction-log.response.dto";
import { TransactionLogRepositoryPort } from "../database/transaction-log.repository.port";
import { InjectTransactionLogRepository } from "../database/transaction-log.repository.provider";

@Injectable()
export class FindTransactionLog
  extends BaseUseCase
  implements IUseCase<FindTransactionLogRequestDTO, TransactionLogResponse[]> {
  constructor(
    @InjectTransactionLogRepository
    private readonly transactionLogRepository: TransactionLogRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    request?: FindTransactionLogRequestDTO,
  ): Promise<TransactionLogResponse[]> {
    try {
      const transactionLogs = await this.transactionLogRepository.findBy({
        transaction_date: { $gte: request.start_date, $lte: request.end_date },
      });

      return transactionLogs.map((log) => {
        const date = this.utils.date.formatDate(log.created_at, "YYYY MMM DD");
        const time = this.utils.date.formatDate(log.created_at, "h:mm:ss A");

        return new TransactionLogResponse({ ...log, date, time });
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
