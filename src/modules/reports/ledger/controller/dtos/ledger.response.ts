import { ApiProperty } from '@nestjs/swagger';
import {
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
} from 'src/interface-adapter/interfaces/ledger/ledger.interface';

class LedgerDetailReportResponse implements ILedgerDetailReportResponse {
  constructor(props: ILedgerDetailReportResponse) {
    this.balance_acc = props?.balance_acc;
    this.balance_acc_name = props?.balance_acc_name;
    this.journal_date = props.journal_date;
    this.journal_number = props.journal_number;
    this.journal_info = props?.journal_info;
    this.debit_amount = props?.debit_amount;
    this.credit_amount = props?.credit_amount;
    this.balance_amount = props.balance_amount;
  }

  @ApiProperty({ example: '2022-09-06' })
  balance_acc?: string;

  @ApiProperty({ example: '2022-09-06' })
  balance_acc_name?: string;

  @ApiProperty({ example: '2022-09-06' })
  journal_date: string;

  @ApiProperty({ example: 'JNF-220831-0001' })
  journal_number: string;

  @ApiProperty({ example: '28 October 2022' })
  journal_info?: string;

  @ApiProperty({ example: 100000 })
  debit_amount?: number;

  @ApiProperty({ example: 100000 })
  credit_amount?: number;

  @ApiProperty({ example: 0 })
  balance_amount: number;
}

export class LedgerReportResponse implements ILedgerReportResponse {
  constructor(props: ILedgerReportResponse) {
    this.balance_acc = props.balance_acc;
    this.balance_acc_name = props.balance_acc_name;
    this.detail_journal = props.detail_journal;
  }

  @ApiProperty({ example: '100001' })
  balance_acc: string;

  @ApiProperty({ example: 'KAS BESAR' })
  balance_acc_name: string;

  @ApiProperty({ type: LedgerDetailReportResponse, isArray: true, example: [] })
  detail_journal: Array<LedgerDetailReportResponse>;
}
