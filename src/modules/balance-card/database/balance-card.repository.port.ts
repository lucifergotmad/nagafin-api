import { BaseRepositoryPort } from "src/core/ports/repository.base.port";
import { BalanceCardMongoEntity } from "./model/balance-card.mongo-entity";
import { BalanceCardEntity } from "../domain/balance-card.entity";
import { LedgerReportRequestDTO } from "src/modules/reports/ledger/controller/dtos/ledger.request.dto";
import { AccountMongoEntity } from "src/modules/account/database/model/account.mongo-entity";
import {
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
} from "src/interface-adapter/interfaces/ledger/ledger.interface";

export interface BalanceCardRepositoryPort
  extends BaseRepositoryPort<BalanceCardMongoEntity, BalanceCardEntity> {
  ledgerReportBeginning(
    filter: LedgerReportRequestDTO,
    listAccount: AccountMongoEntity[],
  ): Promise<ILedgerDetailReportResponse[]>;
  ledgerReport(
    filter: LedgerReportRequestDTO,
  ): Promise<ILedgerReportResponse[]>;
}
