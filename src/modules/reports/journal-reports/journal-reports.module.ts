import { Module } from "@nestjs/common";
import { JournalReportsUseCaseModule } from "./use-cases/journal-reports.use-case.module";
import { JournalReportsController } from "./controller/journal-reports.controller";

@Module({
  imports: [JournalReportsUseCaseModule],
  controllers: [JournalReportsController],
})
export class JournalReportsModule {}
