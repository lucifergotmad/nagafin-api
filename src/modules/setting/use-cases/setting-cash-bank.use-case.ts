import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { AccountRepositoryPort } from 'src/modules/account/database/account.repository.port';
import { InjectAccountRepository } from 'src/modules/account/database/account.repository.provider';
import { SettingCashBankRequestDTO } from '../controller/dtos/setting-cash-bank.request.dto';

@Injectable()
export class SettingCashBank
  extends BaseUseCase
  implements IUseCase<SettingCashBankRequestDTO, MessageResponseDTO> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private utils: Utils,
  ) {
    super();
  }

  public async execute({
    list_acc_bank,
    list_acc_cash,
  }: SettingCashBankRequestDTO): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      if (!list_acc_bank.length && !list_acc_cash.length) {
        throw new BadRequestException('Data tidak boleh kosong!');
      }

      await session.withTransaction(async () => {
        if (list_acc_bank.length) {
          for (const data of list_acc_bank) {
            await this.accountRepository.update(
              { acc_number: data },
              { acc_cashflow_type: 'bank' },
              session,
            );
          }
        }

        if (list_acc_cash.length) {
          for (const data of list_acc_cash) {
            await this.accountRepository.update(
              { acc_number: data },
              { acc_cashflow_type: 'cash' },
              session,
            );
          }
        }
      });

      return new MessageResponseDTO('Berhasil update cashflow account!');
    } catch (error) {
      throw new ResponseException(error.message, error.status);
    } finally {
      await session.endSession();
    }
  }
}
