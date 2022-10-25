import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { AccountResponseDTO } from "src/modules/account/controller/dtos/account.response.dto";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { AccountMongoEntity } from "src/modules/account/database/model/account.mongo-entity";
import { SystemRepositoryPort } from "../database/system.repository.port";
import { InjectSystemRepository } from "../database/system.repository.provider";

@Injectable()
export class FindRetainedEarning
  extends BaseUseCase
  implements IUseCase<never, AccountResponseDTO> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<AccountResponseDTO> {
    try {
      let result: AccountMongoEntity = null;
      const system = await this.systemRepository.findOneLatest({});

      if (!system) {
        throw new BadRequestException("System belum disetting");
      }

      if (system.retained_earnings_acc) {
        result = await this.accountRepository.findOne({
          acc_number: system.retained_earnings_acc,
        });
      }

      return new AccountResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
