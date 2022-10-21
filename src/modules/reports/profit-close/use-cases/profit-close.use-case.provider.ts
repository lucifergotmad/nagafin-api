import { Provider } from "@nestjs/common";
import { ProfitCloseReport } from "./profit-close-report.usecase";
import { TotalProfitClose } from "./total-profit-close.usecase";

export const profitCloseUseCaseProvider: Provider[] = [
  ProfitCloseReport,
  TotalProfitClose,
];
