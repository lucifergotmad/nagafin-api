import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { JournalRepositoryPort } from "../database/journal.repository.port";
import { InjectJournalRepository } from "../database/journal.repository.provider";

@Injectable()
export class DeleteJournal
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.journalRepository.findOneOrThrow(
          { _id },
          "Journal tidak dapat ditemukan!",
        );
        result = await this.journalRepository.delete({ _id }, session);
      });

      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
