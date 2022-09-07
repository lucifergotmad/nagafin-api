import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { ProfitLossReportResponse } from '../controller/dtos/balance.response';
import { ProfitLossReportRequestDTO } from '../controller/dtos/profit-loss-report.request.dto';
import { BalanceRepositoryPort } from '../database/balance.repository.port';
import { InjectBalanceRepository } from '../database/balance.repository.provider';

@Injectable()
export class ProfitLossReport
  extends BaseUseCase
  implements
    IUseCase<ProfitLossReportRequestDTO, Array<ProfitLossReportResponse>> {
  constructor(
    @InjectBalanceRepository private balanceRepository: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: ProfitLossReportRequestDTO,
  ): Promise<Array<ProfitLossReportResponse>> {
    try {
      return [
        new ProfitLossReportResponse({
          parents_acc_number: '100000',
          parents_acc_name: 'AKTIVA LANCAR',
          balance_detail: [
            {
              acc_number: '100001',
              acc_name: 'KAS BESAR',
              balance_amount: 10000,
            },
          ],
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
