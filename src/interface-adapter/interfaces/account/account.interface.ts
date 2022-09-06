import { IId } from '../id.interface';

export interface IAccountResponse extends IId {
  acc_number: string;
  acc_name: string;
  acc_currency: string;
  acc_balance_type: string;
  acc_cashflow_type?: string;
  acc_statement: string;
  acc_type: string;
  acc_parents?: string;
  used_as_parent?: boolean;
  used_in_transaction?: boolean;
}

type TIgnoreAccount = 'acc_parents' | 'used_as_parent' | 'used_in_transaction';
export type TIgnoreAccountChildren =
  | TIgnoreAccount
  | 'acc_currency'
  | 'acc_balance_type'
  | 'acc_cashflow_type';

export interface IAccountTreeResponse
  extends Omit<IAccountResponse, TIgnoreAccount | 'children'> {
  children: Omit<IAccountTreeResponse, TIgnoreAccountChildren>[];
}
