import { ApiProperty } from '@nestjs/swagger';
import {
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
} from 'src/interface-adapter/interfaces/balance/balance.interface';

class LedgerDetailReportResponse implements ILedgerDetailReportResponse {
  constructor(props: ILedgerDetailReportResponse) {
    this.journal_date = props.journal_date;
    this.journal_number = props.journal_number;
    this.journal_notes = props.journal_notes;
    this.total_debit_amount = props.total_debit_amount;
    this.total_credit_amount = props.total_credit_amount;
    this.balance_amount = props.balance_amount;
  }

  @ApiProperty({ example: '2022-09-06' })
  journal_date: string;

  @ApiProperty({ example: 'JNF-220831-0001' })
  journal_number: string;

  @ApiProperty({ example: '28 October 2022' })
  journal_notes: string;

  @ApiProperty({ example: 100000 })
  total_debit_amount: number;

  @ApiProperty({ example: 100000 })
  total_credit_amount: number;

  @ApiProperty({ example: 0 })
  balance_amount: number;
}

export class LedgerReportResponse implements ILedgerReportResponse {
  constructor(props: ILedgerReportResponse) {
    this.balance_acc = props.balance_acc;
    this.detail_journal = props.detail_journal;
  }

  @ApiProperty({ example: '100001 - KAS BESAR' })
  balance_acc: string;

  @ApiProperty({ type: LedgerDetailReportResponse, isArray: true, example: [] })
  detail_journal: Array<LedgerDetailReportResponse>;
}
