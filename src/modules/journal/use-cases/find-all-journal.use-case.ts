import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import {
  IJournalDetailResponse,
  IJournalResponse,
} from 'src/interface-adapter/interfaces/journal/journal.interface';
import { AccountRepositoryPort } from 'src/modules/account/database/account.repository.port';
import { InjectAccountRepository } from 'src/modules/account/database/account.repository.provider';
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
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<JournalResponseDTO[]> {
    try {
      const journals = await this.journalRepository.findAll();

      const result: IJournalResponse[] = [];

      for (const data of journals) {
        const journalDetail: IJournalDetailResponse[] = [];

        for (const item of data.journal_detail) {
          const account = await this.accountRepository.findOne({
            acc_number: item.acc_number,
          });

          journalDetail.push({ ...item, acc_name: account.acc_name });
        }

        result.push({ ...data, journal_detail: journalDetail });
      }

      return result.map(
        (journal: JournalMongoEntity) => new JournalResponseDTO(journal),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
