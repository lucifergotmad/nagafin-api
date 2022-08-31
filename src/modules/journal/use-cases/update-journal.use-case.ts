import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { UpdateJournalRequestDTO } from '../controller/dtos/update-journal.request.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';
import { JournalMongoEntity } from '../database/model/journal.mongo-entity';

@Injectable()
export class UpdateJournal
  extends BaseUseCase
  implements IUseCase<UpdateJournalRequestDTO & IId, MessageResponseDTO> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({
    _id,
    ...data
  }: UpdateJournalRequestDTO & IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      const payload: Partial<JournalMongoEntity> = data;

      const result = await this.journalRepository.update(
        { _id },
        payload,
        session,
      );
      await this.utils.transaction.commitTransaction(session);
      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
