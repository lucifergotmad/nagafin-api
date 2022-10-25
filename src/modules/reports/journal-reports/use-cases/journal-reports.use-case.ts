import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { JournalRepositoryPort } from "src/modules/journal/database/journal.repository.port";
import { InjectJournalRepository } from "src/modules/journal/database/journal.repository.provider";
import { JournalMongoEntity } from "src/modules/journal/database/model/journal.mongo-entity";
import { JournalReportsRequestDTO } from "../controller/dtos/journal-reports.request.dto";
import { JournalReportsResponse } from "../controller/dtos/journal-reports.response";

@Injectable()
export class JournalReports
  extends BaseUseCase
  implements IUseCase<JournalReportsRequestDTO, JournalReportsResponse[]> {
  constructor(
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    data?: JournalReportsRequestDTO,
  ): Promise<JournalReportsResponse[]> {
    try {
      const results = await this.journalRepository.findBy({
        journal_date: { $gte: data.start_date, $lte: data.end_date },
      });
      return results.map(
        (item: JournalMongoEntity) =>
          new JournalReportsResponse({
            journal_number: item.journal_number,
            journal_notes: item.journal_notes,
            journal_date: item.journal_date,
            total_debit_amount: item.total_debit_amount,
            total_credit_amount: item.total_credit_amount,
            created_at: this.utils.date.localDateString(item.created_at),
            created_by: item.created_by,
          }),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
