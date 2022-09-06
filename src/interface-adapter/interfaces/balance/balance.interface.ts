export interface ILedgerDetailReportResponse {
  journal_date: string;
  journal_number: string;
  journal_notes: string;
  total_debit_amount: number;
  total_credit_amount: number;
  balance_amount: number;
}

export interface ILedgerReportResponse {
  balance_acc: string;
  detail_journal: ILedgerDetailReportResponse[];
}
