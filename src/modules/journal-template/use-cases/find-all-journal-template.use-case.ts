import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { JournalTemplateResponseDTO } from '../controller/dtos/journal-template.response';
import { JournalTemplateRepositoryPort } from '../database/journal-template.repository.port';
import { InjectJournalTemplateRepository } from '../database/journal-template.repository.provider';
import { JournalTemplateMongoEntity } from '../database/model/journal-template.mongo-entity';

@Injectable()
export class FindAllJournalTemplate
  extends BaseUseCase
  implements IUseCase<never, Array<JournalTemplateResponseDTO>> {
  constructor(
    @InjectJournalTemplateRepository
    private journalTemplateRepository: JournalTemplateRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<JournalTemplateResponseDTO[]> {
    try {
      return (await this.journalTemplateRepository.findAll()).map(
        (journalTemplate: JournalTemplateMongoEntity) =>
          new JournalTemplateResponseDTO(journalTemplate),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
