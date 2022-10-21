import { ApiProperty } from "@nestjs/swagger";
import {
  IBalanceDetail,
  ITrialBalanceDetailResponse,
  ITrialBalanceResponse,
} from "src/interface-adapter/interfaces/trial-balance/trial-balance.interface";

class BalanceDetailResponse implements IBalanceDetail {
  constructor(props: IBalanceDetail) {
    this.debit_amount = props.debit_amount;
    this.credit_amount = props.credit_amount;
  }

  @ApiProperty({ example: 100000 })
  credit_amount: number;

  @ApiProperty({ example: 10000 })
  debit_amount: number;
}

export class TrialBalanceDetailReportResponse
  implements ITrialBalanceDetailResponse {
  constructor(props: ITrialBalanceDetailResponse) {
    this.acc_name = props.acc_name;
    this.acc_number = props.acc_number;
    this.beginning_balance = props.beginning_balance;
    this.balance_mutation = props.balance_mutation;
    this.ending_balance = props.ending_balance;
  }

  @ApiProperty({ example: "100001" })
  acc_number: string;

  @ApiProperty({ example: "KAS BESAR" })
  acc_name: string;

  @ApiProperty({ type: BalanceDetailResponse })
  beginning_balance: BalanceDetailResponse;

  @ApiProperty({ type: BalanceDetailResponse })
  balance_mutation: BalanceDetailResponse;

  @ApiProperty({ type: BalanceDetailResponse })
  ending_balance: BalanceDetailResponse;
}

export class TrialBalanceReportResponse implements ITrialBalanceResponse {
  constructor(props: ITrialBalanceResponse) {
    this.parents_acc_name = props.parents_acc_name;
    this.parents_acc_number = props.parents_acc_number;
    this.balance_detail = props.balance_detail;
  }

  @ApiProperty({ example: "100000" })
  parents_acc_number: string;

  @ApiProperty({ example: "AKTIVA LANCAR" })
  parents_acc_name: string;

  @ApiProperty({
    type: TrialBalanceDetailReportResponse,
    isArray: true,
    example: [],
  })
  balance_detail: TrialBalanceDetailReportResponse[];
}
