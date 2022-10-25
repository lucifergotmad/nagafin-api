import { Provider } from "@nestjs/common";
import { CreateJournal } from "./create-journal.use-case";
import { DeleteJournal } from "./delete-journal.use-case";
import { FindAllJournal } from "./find-all-journal.use-case";
import { FindJournalById } from "./find-journal-by-id.use-case";
import { JournalReport } from "./journal-report.use-case";
import { UpdateJournal } from "./update-journal.use-case";

export const journalUseCaseProvider: Provider[] = [
  CreateJournal,
  UpdateJournal,
  DeleteJournal,
  FindAllJournal,
  FindJournalById,
  JournalReport,
];
