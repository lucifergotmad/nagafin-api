import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IRepositoryResponse } from 'src/core/ports/interfaces/repository-response.interface';
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
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.currencyRepository.findOneAndThrow(
          { currency_code: data.currency_code },
          'Mata Uang sudah terdaftar!',
        );

        const currencyEntity = CurrencyEntity.create({
          currency_code: data.currency_code,
          currency_name: data.currency_name,
          exchange_rate: data.exchange_rate,
          created_by: this.user?.username,
        });

        result = await this.currencyRepository.save(currencyEntity, session);
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
