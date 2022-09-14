import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { CashFlowReportRequestDTO } from '../controller/dtos/cash-flow.request.dto';
import { CashFlowReportResponse } from '../controller/dtos/cash-flow.response';

@Injectable()
export class CashFlowReport
  extends BaseUseCase
  implements IUseCase<CashFlowReportRequestDTO, CashFlowReportResponse> {
  constructor() {
    super();
  }

  public async execute(
    data: CashFlowReportRequestDTO,
  ): Promise<CashFlowReportResponse> {
    try {
      return new CashFlowReportResponse({
        profit_loss_amount: 10000,
        operational_detail: [],
        investment_detail: [
          {
            acc_name: 'KAS BESAR',
            balance_amount: 10000,
          },
        ],
        funding_detail: [],
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
