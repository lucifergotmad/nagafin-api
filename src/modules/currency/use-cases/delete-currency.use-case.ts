import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { CurrencyRepositoryPort } from '../database/currency.repository.port';
import { InjectCurrencyRepository } from '../database/currency.repository.provider';

@Injectable()
export class DeleteCurrency
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO> {
  constructor(
    @InjectCurrencyRepository
    private currencyRepository: CurrencyRepositoryPort,
    private utils: Utils,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      await this.currencyRepository.findOneOrThrow(
        { _id },
        'Mata uang tidak dapat ditemukan!',
      );

      const result = await this.currencyRepository.delete({ _id }, session);
      await this.utils.transaction.commitTransaction(session);
      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
