import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { JournalResponseDTO } from '../controller/dtos/journal.response.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';
import { JournalMongoEntity } from '../database/model/journal.mongo-entity';

@Injectable()
export class FindAllJournal
  extends BaseUseCase
  implements IUseCase<never, Array<JournalResponseDTO>> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<JournalResponseDTO[]> {
    try {
      return (await this.journalRepository.findAll()).map(
        (journal: JournalMongoEntity) => new JournalResponseDTO(journal),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
