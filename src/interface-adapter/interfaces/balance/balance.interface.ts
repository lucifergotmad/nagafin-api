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

export interface IBalanceDetail {
  credit_amount: number;
  debit_amount: number;
}

export interface ITrialBalanceDetailResponse {
  acc_number: string;
  acc_name: string;
  beginning_balance: IBalanceDetail;
  balance_mutation: IBalanceDetail;
  ending_balance: IBalanceDetail;
}

export interface ITrialBalanceResponse {
  parents_acc_number: string;
  parents_acc_name: string;
  balance_detail: ITrialBalanceDetailResponse[];
}
