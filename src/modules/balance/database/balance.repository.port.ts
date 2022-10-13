import { BaseRepositoryPort } from 'src/core/ports/repository.base.port';
import { BalanceMongoEntity } from './model/balance.mongo-entity';
import { BalanceEntity } from '../domain/balance.entity';
import { IBalanceSheetsResponse } from 'src/interface-adapter/interfaces/balance-sheets/balance-sheets.interface';
import { LedgerReportRequestDTO } from 'src/modules/reports/ledger/controller/dtos/ledger.request.dto';
import { ILedgerDetailReportResponse } from 'src/interface-adapter/interfaces/ledger/ledger.interface';
import { AccountMongoEntity } from 'src/modules/account/database/model/account.mongo-entity';

export interface BalanceRepositoryPort
  extends BaseRepositoryPort<BalanceMongoEntity, BalanceEntity> {
  balanceSheetsReport(
    transaction_date: string,
  ): Promise<IBalanceSheetsResponse>;
  ledgerReport(
    filter: LedgerReportRequestDTO,
    listAccount: AccountMongoEntity[],
  ): Promise<ILedgerDetailReportResponse[]>;
}
