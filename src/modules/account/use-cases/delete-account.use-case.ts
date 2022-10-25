import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { AccountRepositoryPort } from "../database/account.repository.port";
import { InjectAccountRepository } from "../database/account.repository.provider";

@Injectable()
export class DeleteAccount
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO> {
  constructor(
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(data: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        result = await this.accountRepository.delete(
          { _id: data._id },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
