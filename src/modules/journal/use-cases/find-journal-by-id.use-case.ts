import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { IId } from "src/interface-adapter/interfaces/id.interface";
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
export class FindJournalById
  extends BaseUseCase
  implements IUseCase<IId, IJournalResponse> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<IJournalResponse> {
    try {
      const result = await this.journalRepository.findById(_id);

      const journalDetail: IJournalDetailResponse[] = [];

      for (const data of result.journal_detail) {
        const account = await this.accountRepository.findOne({
          acc_number: data.acc_number,
        });

        journalDetail.push({ ...data, acc_name: account.acc_name });
      }

      return new JournalResponseDTO({
        ...result,
        journal_detail: journalDetail,
        created_at: this.utils.date.localDateString(result.created_at),
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
