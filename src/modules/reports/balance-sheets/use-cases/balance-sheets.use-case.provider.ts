import { Provider } from "@nestjs/common";
import { BalanceSheetsReport } from "./balance-sheets-report.use-case";

export const balanceSheetsUseCaseProvider: Provider[] = [BalanceSheetsReport];
