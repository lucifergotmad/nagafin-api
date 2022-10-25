export interface IProfitLossDetailResponse {
  acc_number: string;
  acc_name: string;
  amount: number;
  is_total: boolean;
}

export interface IProfitLossResponse {
  parents_acc_number: string;
  parents_acc_name: string;
  amount: number;
  is_profit: boolean;
  balance_detail: IProfitLossDetailResponse[];
}

export interface IBalanceSheetResponse {
  debit_data: IProfitLossResponse[];
  credit_data: IProfitLossResponse[];
}
