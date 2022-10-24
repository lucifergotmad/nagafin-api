import { Injectable } from "@nestjs/common";
import { ClientSession } from "mongoose";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { InjectBalanceCardRepository } from "../database/balance-card.repository.provider";
import { BalanceCardRepository } from "../database/balance-card.repository.service";

@Injectable()
export class GenerateBeginningBalance
  extends BaseUseCase
  implements IUseCase<RequestBeginningBalanceDTO, number> {
  constructor(
    @InjectBalanceCardRepository
    private readonly balanceCardRepository: BalanceCardRepository,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(
    request: RequestBeginningBalanceDTO,
    session?: ClientSession,
  ): Promise<number> {
    try {
      const result = await this.balanceCardRepository.findBySort(
        request.start_date,
        request.end_date,
        request.balance_acc,
      );
      if (result.length > 0) {
        return result[result.length - 1].ending_amount;
      } else {
        return 0;
      }
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
