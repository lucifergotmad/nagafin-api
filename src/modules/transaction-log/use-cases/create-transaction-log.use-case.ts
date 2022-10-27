import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateTransactionLogRequestDTO } from "../controller/dtos/create-transaction-log.request.dto";
import { InjectTransactionLogRepository } from "../database/transaction-log.repository.provider";
import { TransactionLogRepository } from "../database/transaction-log.repository.service";
import { TransactionLogEntity } from "../domain/transaction-log.entity";

@Injectable()
export class CreateTransactionLog
  extends BaseUseCase
  implements IUseCase<CreateTransactionLogRequestDTO, IdResponseDTO> {
  constructor(
    @InjectTransactionLogRepository
    private readonly transactionLogRepository: TransactionLogRepository,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    request?: CreateTransactionLogRequestDTO,
  ): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;
    try {
      await session.withTransaction(async () => {
        const transactionLogEntity = TransactionLogEntity.create({
          transaction_name: request.transaction_name,
          transaction_detail: request?.transaction_detail,
          transaction_date: this.utils.date.getToday(),
          created_by: request.created_by,
        });

        result = await this.transactionLogRepository.save(
          transactionLogEntity,
          session,
        );
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
