import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { CreateJournalTemplateRequestDTO } from '../controller/create-journal-template.request.dto';
import { JounalTemplateRepositoryPort } from '../database/journal-template.repository.port';
import { InjectJounalTemplateRepository } from '../database/journal-template.repository.provider';

@Injectable()
export class CreateJournalTemplate
  extends BaseUseCase
  implements IUseCase<CreateJournalTemplateRequestDTO, IdResponseDTO> {
  constructor(
    @InjectJounalTemplateRepository
    private journalTemplateRepository: JounalTemplateRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    data: CreateJournalTemplateRequestDTO,
  ): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      const journalTemplateEntity = new JournalTemp();
      const result = await this.journalTemplateRepository.save();
      await this.utils.transaction.commitTransaction(session);
    } catch (error) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
