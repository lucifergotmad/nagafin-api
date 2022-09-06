import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { LedgerReportResponse } from '../controller/dtos/balance.response';
import { LedgerReportRequestDTO } from '../controller/dtos/ledger-report.request.dto';
import { BalanceRepositoryPort } from '../database/balance.repository.port';
import { InjectBalanceRepository } from '../database/balance.repository.provider';

@Injectable()
export class LedgerReport
  extends BaseUseCase
  implements IUseCase<LedgerReportRequestDTO, Array<LedgerReportResponse>> {
  constructor(
    @InjectBalanceRepository private balanceReposiory: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: LedgerReportRequestDTO,
  ): Promise<Array<LedgerReportResponse>> {
    try {
      return [
        new LedgerReportResponse({
          balance_acc: '100001',
          detail_journal: [
            {
              journal_date: '2022-09-06',
              journal_notes: 'Pencatatan Journal 2022',
              journal_number: 'JNF-220831-0001',
              total_debit_amount: 10000,
              total_credit_amount: 10000,
              balance_amount: 0,
            },
          ],
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
