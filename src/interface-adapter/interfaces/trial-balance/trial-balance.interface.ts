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
