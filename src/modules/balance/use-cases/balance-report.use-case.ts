import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { BalanceReportRequestDTO } from '../controller/dtos/balance-report.request.dto';
import { BalanceReportResponse } from '../controller/dtos/balance.response';
import { BalanceRepositoryPort } from '../database/balance.repository.port';
import { InjectBalanceRepository } from '../database/balance.repository.provider';

export class BalanceReport
  extends BaseUseCase
  implements IUseCase<BalanceReportRequestDTO, Array<BalanceReportResponse>> {
  constructor(
    @InjectBalanceRepository private balanceRepository: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: BalanceReportRequestDTO,
  ): Promise<Array<BalanceReportResponse>> {
    try {
      return [
        new BalanceReportResponse({
          parents_acc_number: '100000',
          parents_acc_name: 'AKTIVA LANCAR',
          acc_balance_type: 'D',
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
