import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { AccountResponseDTO } from '../controller/dtos/account.response.dto';
import { AccountRepositoryPort } from '../database/account.repository.port';
import { InjectAccountRepository } from '../database/account.repository.provider';
import { AccountMongoEntity } from '../database/model/account.mongo-entity';

@Injectable()
export class FindAllAccount
  extends BaseUseCase
  implements IUseCase<never, Array<AccountResponseDTO>> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<AccountResponseDTO[]> {
    try {
      return (await this.accountRepository.findAll()).map(
        (account: AccountMongoEntity) =>
          new AccountResponseDTO({
            used_as_parent: false,
            used_in_transaction: false,
            ...account,
          }),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
