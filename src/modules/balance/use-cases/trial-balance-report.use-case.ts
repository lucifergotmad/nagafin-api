import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { TrialBalanceReportResponse } from '../controller/dtos/balance.response';
import { TrialBalanceReportRequestDTO } from '../controller/dtos/trial-balance-report.request.dto';
import { BalanceRepositoryPort } from '../database/balance.repository.port';
import { InjectBalanceRepository } from '../database/balance.repository.provider';

@Injectable()
export class TrialBalanceReport
  extends BaseUseCase
  implements
    IUseCase<TrialBalanceReportRequestDTO, Array<TrialBalanceReportResponse>> {
  constructor(
    @InjectBalanceRepository private balanceRepository: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: TrialBalanceReportRequestDTO,
  ): Promise<Array<TrialBalanceReportResponse>> {
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