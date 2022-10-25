import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IAccountResponse } from "src/interface-adapter/interfaces/account/account.interface";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { JournalRepositoryPort } from "src/modules/journal/database/journal.repository.port";
import { InjectJournalRepository } from "src/modules/journal/database/journal.repository.provider";
import { AccountResponseDTO } from "../controller/dtos/account.response.dto";
import { AccountRepositoryPort } from "../database/account.repository.port";
import { InjectAccountRepository } from "../database/account.repository.provider";

@Injectable()
export class FindAccountById
  extends BaseUseCase
  implements IUseCase<IId, IAccountResponse> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
  ) {
    super();
  }

  public async execute(data: IId): Promise<IAccountResponse> {
    try {
      const account = await this.accountRepository.findById(data._id);

      const isUsedAsParent = await this.accountRepository.isUsedAsParent(
        account.acc_number,
      );
      const isUsedInTransaction = await this.journalRepository.isUsedInTransaction(
        account.acc_number,
      );

      return new AccountResponseDTO({
        ...account,
        used_as_parent: isUsedAsParent,
        used_in_transaction: isUsedInTransaction,
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
