import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IRepositoryResponse } from 'src/core/ports/interfaces/repository-response.interface';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { UpdateJournalTemplateRequestDTO } from '../controller/dtos/update-journal-template.request.dto';
import { JournalTemplateRepositoryPort } from '../database/journal-template.repository.port';
import { InjectJournalTemplateRepository } from '../database/journal-template.repository.provider';

export class UpdateJournalTemplate
  extends BaseUseCase
  implements
    IUseCase<UpdateJournalTemplateRequestDTO & IId, MessageResponseDTO> {
  constructor(
    @InjectJournalTemplateRepository
    private journalTemplateRepository: JournalTemplateRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({
    _id,
    ...data
  }: UpdateJournalTemplateRequestDTO & IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.journalTemplateRepository.findOneOrThrow(
          { _id },
          'Template Journal tidak dapat ditemukan!',
        );

        result = await this.journalTemplateRepository.update(
          { _id },
          data,
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
