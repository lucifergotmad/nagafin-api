import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { ProFormaReportResponse } from '../controller/dtos/balance.response';
import { ProFormaReportRequestDTO } from '../controller/dtos/pro-forma-report.request.dto';
import { BalanceRepositoryPort } from '../database/balance.repository.port';
import { InjectBalanceRepository } from '../database/balance.repository.provider';

@Injectable()
export class ProFormaReport
  extends BaseUseCase
  implements IUseCase<ProFormaReportRequestDTO, ProFormaReportResponse> {
  constructor(
    @InjectBalanceRepository private balanceRepository: BalanceRepositoryPort,
  ) {
    super();
  }

  public async execute(
    data: ProFormaReportRequestDTO,
  ): Promise<ProFormaReportResponse> {
    try {
      return new ProFormaReportResponse({
        debit_accounts: [
          {
            parents_acc_name: 'AKTIVA LANCAR',
            parents_acc_number: '100000',
            balance_detail: [
              {
                acc_number: '100001',
                acc_name: 'KAS BESAR',
                balance_amount: 10000,
              },
            ],
          },
        ],
        credit_accounts: [
          {
            parents_acc_name: 'HUTANG',
            parents_acc_number: '300000',
            balance_detail: [
              {
                acc_number: '300001',
                acc_name: 'HUTANG USAHA',
                balance_amount: 10000,
              },
            ],
          },
        ],
        total_profit_lost: 100000,
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
