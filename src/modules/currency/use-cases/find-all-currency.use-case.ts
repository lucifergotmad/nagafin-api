import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { ICurrencyResponse } from "src/interface-adapter/interfaces/currency/currency.interface";
import { CurrencyResponseDTO } from "../controller/dtos/currency.response.dto";
import { CurrencyRepositoryPort } from "../database/currency.repository.port";
import { InjectCurrencyRepository } from "../database/currency.repository.provider";
import { CurrencyMongoEntity } from "../database/model/currency.mongo-entity";

@Injectable()
export class FindAllCurrency
  extends BaseUseCase
  implements IUseCase<never, ICurrencyResponse[]> {
  constructor(
    @InjectCurrencyRepository
    private currencyRepository: CurrencyRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<ICurrencyResponse[]> {
    try {
      return (await this.currencyRepository.findAll()).map(
        (currency: CurrencyMongoEntity) => new CurrencyResponseDTO(currency),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
