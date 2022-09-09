export interface IBalanceSheetsDetailResponse {
  acc_number: string;
  acc_name: string;
  balance_amount?: number;
  children?: IBalanceSheetsDetailResponse[];
}

export interface IBalanceSheetsResponse {
  parents_acc_number: string;
  parents_acc_name: string;
  acc_balance_type: string;
  balance_detail: IBalanceSheetsDetailResponse[];
}
