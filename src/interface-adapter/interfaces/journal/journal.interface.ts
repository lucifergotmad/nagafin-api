import { IId } from '../id.interface';

export interface IJournalDetailResponse {
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
  journal_status: boolean;
  journal_detail: IJournalDetailResponse[];
}