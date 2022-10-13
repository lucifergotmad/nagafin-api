import { IId } from '../id.interface';

export interface IJournalDetailResponse {
  acc_name?: string;
  acc_number: string;
  credit_amount: number;
  debit_amount: number;
  journal_info: string;
}

export interface IJournalResponse extends IId {
  journal_number: string;
  journal_notes: string;
  journal_date: string;
  total_credit_amount: number;
  total_debit_amount: number;
  journal_detail: IJournalDetailResponse[];
}

export interface IJournalReportResponse {
  journal_number: string;
  journal_notes: string;
  journal_date: string;
  total_credit_amount: number;
  total_debit_amount: number;
  created_at: string;
  created_by: string;
}

export interface IPayloadJournalBalance {
  status: string;
  balance_date: string;
  balance_acc: string;
  credit_amount: number;
  debit_amount: number;
}
