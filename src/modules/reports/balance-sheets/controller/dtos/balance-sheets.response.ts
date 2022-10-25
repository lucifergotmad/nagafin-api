import { ApiProperty } from "@nestjs/swagger";
import {
  IBalanceSheetsDetailResponse,
  IBalanceSheetsResponse,
} from "src/interface-adapter/interfaces/balance-sheets/balance-sheets.interface";

class BalanceSheetsDetailReportResponse
  implements IBalanceSheetsDetailResponse {
  constructor(props: IBalanceSheetsDetailResponse) {
    this.acc_number = props.acc_number;
    this.acc_name = props.acc_name;
    this.balance_amount = props.balance_amount;
  }

  @ApiProperty({ example: "100001" })
  acc_number: string;

  @ApiProperty({ example: "KAS BESAR" })
  acc_name: string;

  @ApiProperty({ example: 10000 })
  balance_amount?: number;

  @ApiProperty({
    type: BalanceSheetsDetailReportResponse,
    isArray: true,
    example: [],
  })
  children?: BalanceSheetsDetailReportResponse[];
}

export class BalanceSheetsReportResponse implements IBalanceSheetsResponse {
  constructor(props: IBalanceSheetsResponse) {
    this.parents_acc_number = props.parents_acc_number;
    this.parents_acc_name = props.parents_acc_name;
    this.acc_balance_type = props.acc_balance_type;
    this.balance_detail = props.balance_detail;
  }

  @ApiProperty({ example: "100000" })
  parents_acc_number: string;

  @ApiProperty({ example: "AKTIVA LANCAR" })
  parents_acc_name: string;

  @ApiProperty({ example: "D" })
  acc_balance_type: string;

  @ApiProperty({
    type: BalanceSheetsDetailReportResponse,
    isArray: true,
    example: [],
  })
  balance_detail: BalanceSheetsDetailReportResponse[];
}
