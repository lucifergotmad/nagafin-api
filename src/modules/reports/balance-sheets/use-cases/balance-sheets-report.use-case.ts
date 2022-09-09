import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { BalanceSheetsReportRequestDTO } from '../controller/dtos/balance-sheets.request.dto';
import { BalanceSheetsReportResponse } from '../controller/dtos/balance-sheets.response';

@Injectable()
export class BalanceSheetsReport
  extends BaseUseCase
  implements
    IUseCase<BalanceSheetsReportRequestDTO, BalanceSheetsReportResponse[]> {
  constructor() {
    super();
  }

  public async execute(
    data: BalanceSheetsReportRequestDTO,
  ): Promise<BalanceSheetsReportResponse[]> {
    try {
      return [
        new BalanceSheetsReportResponse({
          parents_acc_number: '100000',
          parents_acc_name: 'AKTIVA LANCAR',
          acc_balance_type: 'D',
          balance_detail: [
            {
              acc_number: '110000',
              acc_name: 'KAS & BANK',
              children: [
                {
                  acc_number: '110001',
                  acc_name: 'KAS BESAR',
                  balance_amount: 10000,
                },
                {
                  acc_number: '110002',
                  acc_name: 'KAS KECIL',
                  balance_amount: 0,
                },
              ],
            },
          ],
        }),
      ];
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
