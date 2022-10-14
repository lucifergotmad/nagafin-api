import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { AccountResponseDTO } from '../controller/dtos/account.response.dto';
import { AccountRepositoryPort } from '../database/account.repository.port';
import { InjectAccountRepository } from '../database/account.repository.provider';
import { AccountMongoEntity } from '../database/model/account.mongo-entity';

@Injectable()
export class FindCashFlowAccount
  extends BaseUseCase
  implements IUseCase<string, AccountResponseDTO[]> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(type?: string): Promise<AccountResponseDTO[]> {
    try {
      const identifier =
        type !== 'ALL'
          ? { acc_cashflow_type: type }
          : { acc_cashflow_type: { $ne: 'none' } };

      const result = await this.accountRepository.findBy(identifier);
      return result.map(
        (account: AccountMongoEntity) => new AccountResponseDTO(account),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
