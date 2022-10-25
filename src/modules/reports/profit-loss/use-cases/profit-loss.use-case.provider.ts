import { Provider } from "@nestjs/common";
import { ProfitLossReport } from "./profit-loss-report.usecase";
import { TotalProfitLoss } from "./total-profit-loss.usecase";

export const profitLossUseCaseProvider: Provider[] = [
  ProfitLossReport,
  TotalProfitLoss,
];
