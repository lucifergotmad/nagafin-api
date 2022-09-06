import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { JournalReportRequestDTO } from '../controller/dtos/journal-report.request.dto';
import { JournalReportResponseDTO } from '../controller/dtos/journal.response.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';

@Injectable()
export class JournalReport
  extends BaseUseCase
  implements
    IUseCase<JournalReportRequestDTO, Array<JournalReportResponseDTO>> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    data: JournalReportRequestDTO,
  ): Promise<JournalReportResponseDTO[]> {
    try {
      return [
        new JournalReportResponseDTO({
          journal_date: '2022-09-06',
          journal_notes: '6 September 2022',
          journal_number: 'JNF-220831-0001',
          total_credit_amount: 100000,
          total_debit_amount: 100000,
          created_at: this.utils.date.localDateString(new Date()),
          created_by: 'lucifer',
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
