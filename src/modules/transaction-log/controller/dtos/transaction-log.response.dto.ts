import { ApiProperty } from "@nestjs/swagger";
import { ITransactionLogResponse } from "src/interface-adapter/interfaces/transaction-log/transaction-log.interface";

export class TransactionLogResponse implements ITransactionLogResponse {
  constructor(props: ITransactionLogResponse) {
    this.transaction_name = props.transaction_name;
    this.transaction_detail = props?.transaction_detail;
    this.created_by = props.created_by;
    this.date = props.date;
    this.time = props.time;
  }

  @ApiProperty()
  transaction_name: string;

  @ApiProperty()
  transaction_detail?: string;

  @ApiProperty()
  created_by: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  time: string;
}
