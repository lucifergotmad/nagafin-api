import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { JournalTemplateRepositoryPort } from '../database/journal-template.repository.port';
import { InjectJournalTemplateRepository } from '../database/journal-template.repository.provider';

@Injectable()
export class DeleteJournalTemplate
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO> {
  constructor(
    @InjectJournalTemplateRepository
    private journalTemplateRepository: JournalTemplateRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await this.journalTemplateRepository.findOneOrThrow(
        { _id },
        'Template Journal tidak dapat ditemukan!',
      );

      const result = await this.journalTemplateRepository.delete(
        { _id },
        session,
      );
      await this.utils.transaction.commitTransaction(session);
      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}