import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { BalanceRepositoryPort } from 'src/modules/balance/database/balance.repository.port';
import { InjectBalanceRepository } from 'src/modules/balance/database/balance.repository.provider';
import { TrialBalanceReportRequestDTO } from '../controller/dtos/trial-balance-report.request.dto';
import { TrialBalanceReportResponse } from '../controller/dtos/trial-balance.response';

@Injectable()
export class TrialBalanceReport
  extends BaseUseCase
  implements
    IUseCase<TrialBalanceReportRequestDTO, TrialBalanceReportResponse[]> {
  constructor(
    @InjectBalanceRepository
    private readonly balanceRepository: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: TrialBalanceReportRequestDTO,
  ): Promise<TrialBalanceReportResponse[]> {
    try {
      return [
        new TrialBalanceReportResponse({
          parents_acc_name: 'AKTIVA LANCAR',
          parents_acc_number: '100000',
          balance_detail: [
            {
              acc_number: '100001',
              acc_name: 'KAS BESAR',
              beginning_balance: { credit_amount: 0, debit_amount: 0 },
              balance_mutation: { credit_amount: 0, debit_amount: 0 },
              ending_balance: { credit_amount: 0, debit_amount: 0 },
            },
          ],
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
