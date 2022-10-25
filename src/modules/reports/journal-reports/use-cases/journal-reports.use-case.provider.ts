import { Provider } from "@nestjs/common";
import { JournalReports } from "./journal-reports.use-case";

export const journalReportsUseCaseProvider: Provider[] = [JournalReports];
