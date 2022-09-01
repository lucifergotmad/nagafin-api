import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { IJournalResponse } from 'src/interface-adapter/interfaces/journal/journal.interface';
import { JournalResponseDTO } from '../controller/dtos/journal.response.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';

@Injectable()
export class FindJournalById
  extends BaseUseCase
  implements IUseCase<IId, IJournalResponse> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<IJournalResponse> {
    try {
      return new JournalResponseDTO(await this.journalRepository.findById(_id));
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
