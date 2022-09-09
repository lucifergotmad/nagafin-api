import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { JournalReportsRequestDTO } from '../controller/dtos/journal-reports.request.dto';
import { JournalReportsResponse } from '../controller/dtos/journal-reports.response';

@Injectable()
export class JournalReports
  extends BaseUseCase
  implements IUseCase<JournalReportsRequestDTO, JournalReportsResponse[]> {
  constructor() {
    super();
  }

  public async execute(
    data?: JournalReportsRequestDTO,
  ): Promise<JournalReportsResponse[]> {
    try {
      return [
        new JournalReportsResponse({
          journal_date: '2022-09-09',
          journal_notes: '28 October 2022',
          journal_number: 'JNF-220831-0001',
          total_debit_amount: 10000,
          total_credit_amount: 10000,
          created_at: '2022-09-09',
          created_by: 'lucifer',
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
