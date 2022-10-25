import { Provider } from "@nestjs/common";
import { LedgerReport } from "./ledger-report.use-case";

export const ledgerUseCaseProvider: Provider[] = [LedgerReport];
