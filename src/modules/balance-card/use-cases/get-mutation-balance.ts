import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { InjectBalanceCardRepository } from "../database/balance-card.repository.provider";
import { BalanceCardRepository } from "../database/balance-card.repository.service";

@Injectable()
export class GenerateMutationBalance
  extends BaseUseCase
  implements IUseCase<RequestBeginningBalanceDTO, number> {
  constructor(
    @InjectBalanceCardRepository
    private readonly balanceCardRepository: BalanceCardRepository,
  ) {
    super();
  }

  public async execute(request: RequestBeginningBalanceDTO): Promise<number> {
    try {
      const result = await this.balanceCardRepository.findBySort(
        request.start_date,
        request.end_date,
        request.balance_acc,
      );
      if (result.length > 0) {
        return result.reduce((a, b) => a + b.mutation_amount, 0);
      } else {
        return 0;
      }
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
