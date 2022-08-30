import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IAccountResponse } from 'src/interface-adapter/interfaces/account/account.interface';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { AccountResponseDTO } from '../controller/dtos/account.response';
import { AccountRepositoryPort } from '../database/account.repository.port';
import { InjectAccountRepository } from '../database/account.repository.provider';

@Injectable()
export class FindAccountById
  extends BaseUseCase
  implements IUseCase<IId, IAccountResponse> {
  constructor(
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(data: IId): Promise<IAccountResponse> {
    try {
      return new AccountResponseDTO(
        await this.accountRepository.findById(data._id),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
