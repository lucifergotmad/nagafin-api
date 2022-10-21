export interface IProfitCloseDetailResponse {
  acc_number: string;
  acc_name: string;
  amount: number;
  is_total: boolean;
}

export interface IProfitCloseResponse {
  parents_acc_number: string;
  parents_acc_name: string;
  amount: number;
  is_profit: boolean;
  balance_detail: IProfitCloseDetailResponse[];
}

export interface IBalanceSheetResponse {
  debit_data: IProfitCloseResponse[];
  credit_data: IProfitCloseResponse[];
}
