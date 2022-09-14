export interface ICashFlowDetailResponse {
  acc_name: string;
  balance_amount: number;
}

export interface ICashFlowResponse {
  profit_loss_amount: number;
  operational_detail: ICashFlowDetailResponse[];
  investment_detail: ICashFlowDetailResponse[];
  funding_detail: ICashFlowDetailResponse[];
}
