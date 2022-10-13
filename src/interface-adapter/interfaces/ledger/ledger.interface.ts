export interface ILedgerDetailReportResponse {
  balance_acc?: string;
  balance_acc_name?: string;
  journal_date: string;
  journal_number: string;
  journal_info?: string;
  debit_amount?: number;
  credit_amount?: number;
  balance_amount: number;
}

export interface ILedgerReportResponse {
  balance_acc: string;
  balance_acc_name: string;
  detail_journal: ILedgerDetailReportResponse[];
}
