import { ApiProperty } from '@nestjs/swagger';
import {
  IBalanceDetail,
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
  ITrialBalanceDetailResponse,
  ITrialBalanceResponse,
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

class TrialBalanceDetailReportResponse implements ITrialBalanceDetailResponse {
  constructor(props: ITrialBalanceDetailResponse) {
    this.acc_name = props.acc_name;
    this.acc_number = props.acc_number;
    this.beginning_balance = props.beginning_balance;
    this.balance_mutation = props.balance_mutation;
    this.ending_balance = props.ending_balance;
  }

  @ApiProperty({ example: '100001' })
  acc_number: string;

  @ApiProperty({ example: 'KAS BESAR' })
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

  @ApiProperty({ example: '100000' })
  parents_acc_number: string;

  @ApiProperty({ example: 'AKTIVA LANCAR' })
  parents_acc_name: string;

  @ApiProperty({
    type: TrialBalanceDetailReportResponse,
    isArray: true,
    example: [],
  })
  balance_detail: TrialBalanceDetailReportResponse[];
}
