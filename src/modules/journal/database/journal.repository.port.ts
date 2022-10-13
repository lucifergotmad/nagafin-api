import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { JournalMongoEntity } from './model/journal.mongo-entity';
import { JournalEntity } from '../domain/journal.entity';
import { LedgerReportRequestDTO } from 'src/modules/reports/ledger/controller/dtos/ledger.request.dto';
import { LedgerReportResponse } from 'src/modules/reports/ledger/controller/dtos/ledger.response';

export interface JournalRepositoryPort
  extends BaseRepositoryPort<JournalMongoEntity, JournalEntity> {
  isUsedInTransaction(acc_number: string): Promise<boolean>;
  ledgerReport(filter: LedgerReportRequestDTO): Promise<LedgerReportResponse[]>;
}
