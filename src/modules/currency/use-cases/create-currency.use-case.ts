import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { CreateCurrencyRequestDTO } from '../controller/dtos/create-currency.request.dto';
import { CurrencyRepositoryPort } from '../database/currency.repository.port';
import { InjectCurrencyRepository } from '../database/currency.repository.provider';
import { CurrencyEntity } from '../domain/currency.entity';

@Injectable()
export class CreateCurrency
  extends BaseUseCase
  implements IUseCase<CreateCurrencyRequestDTO, IdResponseDTO> {
  constructor(
    @InjectCurrencyRepository
    private currencyRepository: CurrencyRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(data: CreateCurrencyRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await this.currencyRepository.findOneAndThrow(
        { currency_code: data.currency_code },
        'Mata Uang sudah terdaftar!',
      );

      const currencyEntity = CurrencyEntity.create({
        currency_code: data.currency_code,
        currency_name: data.currency_name,
        exchange_rate: data.exchange_rate,
        currency_status: data.currency_status,
        created_by: this.user?.username,
      });
      const result = await this.currencyRepository.save(
        currencyEntity,
        session,
      );

      await this.utils.transaction.commitTransaction(session);
      return new IdResponseDTO(result._id);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}