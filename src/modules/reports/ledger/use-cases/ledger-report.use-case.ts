import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import {
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
} from "src/interface-adapter/interfaces/ledger/ledger.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { BalanceCardRepositoryPort } from "src/modules/balance-card/database/balance-card.repository.port";
import { InjectBalanceCardRepository } from "src/modules/balance-card/database/balance-card.repository.provider";
import { LedgerReportRequestDTO } from "../controller/dtos/ledger.request.dto";
import { LedgerReportResponse } from "../controller/dtos/ledger.response";

@Injectable()
export class LedgerReport
  extends BaseUseCase
  implements IUseCase<LedgerReportRequestDTO, LedgerReportResponse[]> {
  constructor(
    @InjectBalanceCardRepository
    private readonly balanceCardRepository: BalanceCardRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
  ) {
    super();
  }

  public async execute(
    request?: LedgerReportRequestDTO,
  ): Promise<LedgerReportResponse[]> {
    try {
      const accounts = await this.accountRepository.findBy({
        acc_active: true,
        acc_type: "transaction",
      });

      const beginningBalance = await this.balanceCardRepository.ledgerReportBeginning(
        request,
        accounts,
      );

      const result = await this.balanceCardRepository.ledgerReport(request);

      beginningBalance.forEach((balance: ILedgerDetailReportResponse) => {
        const index = result.findIndex(
          (ledger: ILedgerReportResponse) =>
            ledger.balance_acc === balance.balance_acc,
        );
        if (index !== -1) {
          result[index].detail_journal.unshift({
            journal_date: balance.journal_date,
            balance_amount: balance.balance_amount || 0,
            credit_amount: 0,
            debit_amount: 0,
            journal_info: "",
            journal_number: "SALDO AWAL",
          });
        } else {
          result.push({
            balance_acc: balance.balance_acc,
            balance_acc_name: balance.balance_acc_name,
            detail_journal: [
              {
                journal_date: balance.journal_date,
                balance_amount: balance.balance_amount,
                credit_amount: 0,
                debit_amount: 0,
                journal_info: "",
                journal_number: "SALDO AWAL",
              },
            ],
          });
        }
      });

      // console.log(result);

      return result
        .map((ledger: LedgerReportResponse) => new LedgerReportResponse(ledger))
        .sort((a, b) => (a.balance_acc > b.balance_acc ? 1 : -1));
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
