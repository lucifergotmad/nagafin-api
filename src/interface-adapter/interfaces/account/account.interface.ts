import { IId } from '../id.interface';

export interface AccountResponse extends IId {
  acc_number: string;
  acc_name: string;
  acc_currency: string;
  acc_balance_type: string;
  acc_cashflow_type: string;
  acc_statement: string;
  acc_type: string;
  acc_parents?: string;
}
