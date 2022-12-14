import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IAccountResponse } from "src/interface-adapter/interfaces/account/account.interface";
import { JournalRepositoryPort } from "src/modules/journal/database/journal.repository.port";
import { InjectJournalRepository } from "src/modules/journal/database/journal.repository.provider";
import { AccountResponseDTO } from "../controller/dtos/account.response.dto";
import { FindAllAccountRequestDTO } from "../controller/dtos/find-all-account.request.dto";
import { AccountRepositoryPort } from "../database/account.repository.port";
import { InjectAccountRepository } from "../database/account.repository.provider";
import { AccountMongoEntity } from "../database/model/account.mongo-entity";

@Injectable()
export class FindAllAccount
  extends BaseUseCase
  implements IUseCase<FindAllAccountRequestDTO, Array<AccountResponseDTO>> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
  ) {
    super();
  }

  public async execute({
    acc_type,
  }: FindAllAccountRequestDTO): Promise<AccountResponseDTO[]> {
    try {
      const filterAccount = !acc_type ? {} : { acc_type };
      const accounts = await this.accountRepository.findBy(filterAccount);
      const result: IAccountResponse[] = [];

      for (const account of accounts) {
        const isUsedAsParent = await this.accountRepository.isUsedAsParent(
          account.acc_number,
        );
        const isUsedInTransaction = await this.journalRepository.isUsedInTransaction(
          account.acc_number,
        );

        result.push({
          ...account,
          used_as_parent: isUsedAsParent,
          used_in_transaction: isUsedInTransaction,
        });
      }

      return result
        .map((account: AccountMongoEntity) => new AccountResponseDTO(account))
        .sort((a, b) => (a.acc_number < b.acc_number ? -1 : 1));
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
