import { ApiProperty } from "@nestjs/swagger";
import {
  IBalanceSheetResponse,
  IProfitCloseDetailResponse,
  IProfitCloseResponse,
} from "src/interface-adapter/interfaces/profit-close/profit-close.interface";

export class ProfitCloseDetailResponse implements IProfitCloseDetailResponse {
  constructor(props: IProfitCloseDetailResponse) {
    this.acc_name = props.acc_name;
    this.acc_number = props.acc_number;
    this.amount = props.amount;
  }
  is_total: boolean;

  @ApiProperty({ example: "100001" })
  acc_number: string;

  @ApiProperty({ example: "KAS BESAR" })
  acc_name: string;

  @ApiProperty({ example: 0 })
  amount: number;
}

export class ProfitCloseResponse implements IProfitCloseResponse {
  constructor(props: IProfitCloseResponse) {
    this.parents_acc_name = props.parents_acc_name;
    this.parents_acc_number = props.parents_acc_number;
    this.balance_detail = props.balance_detail;
    this.amount = props.amount;
    this.is_profit = props.is_profit;
  }

  @ApiProperty({ example: "100000" })
  parents_acc_number: string;

  @ApiProperty({ example: "AKTIVA LANCAR" })
  parents_acc_name: string;

  @ApiProperty({ example: 0 })
  amount: number;

  @ApiProperty({ example: true })
  is_profit: boolean;

  @ApiProperty({
    type: ProfitCloseDetailResponse,
    isArray: true,
    example: [],
  })
  balance_detail: ProfitCloseDetailResponse[];
}

export class BalanceSheetResponse implements IBalanceSheetResponse {
  constructor(props: IBalanceSheetResponse) {
    this.credit_data = props.credit_data;
    this.debit_data = props.debit_data;
  }

  @ApiProperty({
    type: ProfitCloseResponse,
    isArray: true,
    example: [],
  })
  debit_data: IProfitCloseResponse[];

  @ApiProperty({
    type: ProfitCloseResponse,
    isArray: true,
    example: [],
  })
  credit_data: IProfitCloseResponse[];
}
