import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import {
  IJournalDetailResponse,
  IJournalResponse,
} from "src/interface-adapter/interfaces/journal/journal.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { JournalResponseDTO } from "../controller/dtos/journal.response.dto";
import { JournalRepositoryPort } from "../database/journal.repository.port";
import { InjectJournalRepository } from "../database/journal.repository.provider";

@Injectable()
export class FindAllJournal
  extends BaseUseCase
  implements IUseCase<never, Array<JournalResponseDTO>> {
  constructor(
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(): Promise<JournalResponseDTO[]> {
    try {
      const journals = await this.journalRepository.findAllAndSort();

      const result: IJournalResponse[] = [];

      for (const data of journals) {
        const journalDetail: IJournalDetailResponse[] = [];

        for (const item of data.journal_detail) {
          const account = await this.accountRepository.findOne({
            acc_number: item.acc_number,
          });

          journalDetail.push({ ...item, acc_name: account.acc_name });
        }

        result.push({
          ...data,
          journal_detail: journalDetail,
          created_at: this.utils.date.localDateString(data.created_at),
        });
      }

      return result.map(
        (journal: IJournalResponse) =>
          new JournalResponseDTO({
            ...journal,
          }),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
