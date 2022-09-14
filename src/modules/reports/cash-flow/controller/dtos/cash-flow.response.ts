import { ApiProperty } from '@nestjs/swagger';
import {
  ICashFlowDetailResponse,
  ICashFlowResponse,
} from 'src/interface-adapter/interfaces/cash-flow/cash-flow.interface';

class CashFlowDetailReportResponse implements ICashFlowDetailResponse {
  constructor(props: ICashFlowDetailResponse) {
    this.acc_name = props.acc_name;
    this.balance_amount = props.balance_amount;
  }

  @ApiProperty({ example: 'KAS BESAR' })
  acc_name: string;

  @ApiProperty({ example: 10000 })
  balance_amount: number;
}

export class CashFlowReportResponse implements ICashFlowResponse {
  constructor(props: ICashFlowResponse) {
    this.profit_loss_amount = props.profit_loss_amount;
    this.operational_detail = props.operational_detail;
    this.investment_detail = props.investment_detail;
    this.funding_detail = props.funding_detail;
  }

  @ApiProperty({})
  profit_loss_amount: number;

  @ApiProperty()
  operational_detail: CashFlowDetailReportResponse[];

  @ApiProperty()
  investment_detail: CashFlowDetailReportResponse[];

  @ApiProperty()
  funding_detail: CashFlowDetailReportResponse[];
}
