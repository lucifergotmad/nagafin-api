import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { AccountRepositoryPort } from 'src/modules/account/database/account.repository.port';
import { InjectAccountRepository } from 'src/modules/account/database/account.repository.provider';
import { SettingCashflowRequestDTO } from '../controller/dtos/setting-cashflow.request.dto';

@Injectable()
export class SettingCashflow
  extends BaseUseCase
  implements IUseCase<SettingCashflowRequestDTO, MessageResponseDTO> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    request?: SettingCashflowRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await session.withTransaction(async () => {
        for (const { acc_number, acc_cashflow_type } of request.list_account) {
          await this.accountRepository.update(
            { acc_number },
            { acc_cashflow_type },
            session,
          );
        }
      });

      return new MessageResponseDTO('Berhasil update tipe arus kas!');
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
