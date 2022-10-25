import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { JournalModel } from "./model/journal.mongo-entity";
import { journalRepositoryProvider } from "./journal.repository.provider";

@Module({
  imports: [MongooseModule.forFeature(JournalModel)],
  providers: [journalRepositoryProvider],
  exports: [journalRepositoryProvider],
})
export class JournalRepositoryModule {}
