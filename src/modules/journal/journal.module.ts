import { Module } from "@nestjs/common";
import { JournalRepositoryModule } from "./database/journal.repository.module";
import { JournalUseCaseModule } from "./use-cases/journal.use-case.module";
import { JournalController } from "./controller/journal.controller";

@Module({
  imports: [JournalUseCaseModule, JournalRepositoryModule],
  controllers: [JournalController],
})
export class JournalModule {}
