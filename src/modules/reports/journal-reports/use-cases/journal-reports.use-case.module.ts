import { Module } from "@nestjs/common";
import { JournalRepositoryModule } from "src/modules/journal/database/journal.repository.module";
import { journalReportsUseCaseProvider } from "./journal-reports.use-case.provider";

@Module({
  imports: [JournalRepositoryModule],
  exports: journalReportsUseCaseProvider,
  providers: journalReportsUseCaseProvider,
})
export class JournalReportsUseCaseModule {}
