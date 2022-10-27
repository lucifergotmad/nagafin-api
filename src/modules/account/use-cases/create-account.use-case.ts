import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TransactionLog } from "src/core/constants/app/transaction-log/transaction-log.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateTransactionLog } from "src/modules/transaction-log/use-cases/create-transaction-log.use-case";
import { CreateAccountRequestDTO } from "../controller/dtos/create-account.request.dto";
import { AccountRepositoryPort } from "../database/account.repository.port";
import { InjectAccountRepository } from "../database/account.repository.provider";
import { AccountEntity } from "../domain/account.entity";

@Injectable()
export class CreateAccount
  extends BaseUseCase
  implements IUseCase<CreateAccountRequestDTO, IdResponseDTO> {
  constructor(
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
    private readonly createTransactionLog: CreateTransactionLog,
    private readonly utils: Utils,
  ) {
    super();
  }
  public async execute(data: CreateAccountRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.accountRepository.findOneAndThrow(
          { acc_number: data.acc_number },
          "Nomor akun sudah terdaftar!",
        );

        console.log(data?.acc_parents);

        const accountEntity = AccountEntity.create({
          acc_number: data.acc_number,
          acc_name: data.acc_name,
          acc_currency: data.acc_currency,
          acc_balance_type: data.acc_balance_type,
          acc_cashflow_type: data?.acc_cashflow_type,
          acc_statement: data.acc_statement,
          acc_type: data.acc_type,
          acc_parents: data?.acc_parents,
          acc_active: data?.acc_active,
          created_by: this.user?.username,
        });

        console.log(accountEntity);

        result = await this.accountRepository.save(accountEntity, session);

        await this.createTransactionLog.execute({
          transaction_name: TransactionLog.AddCOA,
          transaction_detail: `${data.acc_number} - ${TransactionLog.AddCOA}`,
          created_by: this.user?.username,
        });
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
