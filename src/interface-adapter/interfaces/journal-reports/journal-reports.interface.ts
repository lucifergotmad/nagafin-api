export interface IJournalReportsResponse {
  journal_number: string;
  journal_notes: string;
  journal_date: string;
  total_credit_amount: number;
  total_debit_amount: number;
  created_at: string;
  created_by: string;
}

export interface IJournalReportsRequest {
  start_date: string;
  end_date: string;
}
