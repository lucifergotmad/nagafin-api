import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { CreateAccountRequestDTO } from '../controller/dtos/create-account.request.dto';
import { AccountRepositoryPort } from '../database/account.repository.port';
import { InjectAccountRepository } from '../database/account.repository.provider';
import { AccountEntity } from '../domain/account.entity';

@Injectable()
export class CreateAccount
  extends BaseUseCase
  implements IUseCase<CreateAccountRequestDTO, IdResponseDTO> {
  constructor(
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }
  public async execute(data: CreateAccountRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await this.accountRepository.findOneAndThrow(
        { acc_number: data.acc_number },
        'Nomor akun sudah terdaftar!',
      );

      const accountEntity = AccountEntity.create({
        acc_number: data.acc_number,
        acc_name: data.acc_name,
        acc_currency: data.acc_currency,
        acc_balance_type: data.acc_balance_type,
        acc_cashflow_type: data.acc_cashflow_type,
        acc_statement: data.acc_statement,
        acc_type: data.acc_statement,
        acc_parents: data?.acc_parents,
        acc_active: data?.acc_active,
        inputted_by: this.user?.user_id,
        inputted_at: new Date(),
      });
      const result = await this.accountRepository.save(accountEntity, session);

      await this.utils.transaction.commitTransaction(session);
      return new IdResponseDTO(result._id);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
