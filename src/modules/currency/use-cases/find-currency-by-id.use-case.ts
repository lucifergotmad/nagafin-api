import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { ICurrencyResponse } from 'src/interface-adapter/interfaces/currency/currency.interface';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { CurrencyResponseDTO } from '../controller/dtos/currency.response.dto';
import { CurrencyRepositoryPort } from '../database/currency.repository.port';
import { InjectCurrencyRepository } from '../database/currency.repository.provider';

@Injectable()
export class FindCurrencyById
  extends BaseUseCase
  implements IUseCase<IId, ICurrencyResponse> {
  constructor(
    @InjectCurrencyRepository
    private currencyRepository: CurrencyRepositoryPort,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<ICurrencyResponse> {
    try {
      return new CurrencyResponseDTO(
        await this.currencyRepository.findById(_id),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
