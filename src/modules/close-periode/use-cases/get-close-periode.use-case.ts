import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { AccountRepository } from "src/modules/account/database/account.repository.service";
import { GenerateEndingBalance } from "src/modules/balance-card/use-cases/get-ending-balance.usecase";
import { JournalDetailRequestDTO } from "src/modules/journal/controller/dtos/create-journal.request.dto";
import { TotalProfitClose } from "src/modules/reports/profit-close/use-cases/total-profit-close.usecase";
import { SystemRepositoryPort } from "src/modules/system/database/system.repository.port";
import { InjectSystemRepository } from "src/modules/system/database/system.repository.provider";
import {
  listJournalClosePeriode,
  ResponseGetListClosePeriodeDTO,
  ResponseGetListClosePeriodeWrapperDTO,
} from "../controller/dtos/get-list-close-periode-account.dto";
import { RequestGetListClosePeriodeDTO } from "../controller/dtos/request-get-list-close-periode.dto";
import { ClosePeriodeRepositoryPort } from "../database/close-periode.repository.port";
import { InjectClosePeriodeRepository } from "../database/close-periode.repository.provider";

@Injectable()
export class GetListClosePeriodeAccount
  extends BaseUseCase
  implements
    IUseCase<
      RequestGetListClosePeriodeDTO,
      ResponseGetListClosePeriodeWrapperDTO
    > {
  constructor(
    @InjectClosePeriodeRepository
    private closePeriode: ClosePeriodeRepositoryPort,
    private accountRepository: AccountRepository,
    private generateEndingBalance: GenerateEndingBalance,
    private totalProfiteLoss: TotalProfitClose,
    @InjectSystemRepository
    private systemRepo: SystemRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    query: RequestGetListClosePeriodeDTO,
  ): Promise<ResponseGetListClosePeriodeWrapperDTO> {
    try {
      const session = await this.utils.transaction.startTransaction();
      const listAccount = await this.accountRepository.findBy(
        {
          acc_statement: "PL",
          acc_type: "transaction",
        },
        session,
      );

      const now = new Date();
      const lastDayOfYear = new Date(now.getFullYear() - 1, 11 + 1, 0 + 1);
      console.log(query);
      const listResult: ResponseGetListClosePeriodeDTO[] = [];
      const listJournal: listJournalClosePeriode[] = [];
      for (const account of listAccount) {
        const endingBalance = await this.generateEndingBalance.execute({
          balance_acc: account.acc_number,
          end_date: query.end_date,
          start_date: lastDayOfYear.toISOString().split("T")[0],
        });
        if (endingBalance > 0) {
          listResult.push({
            account_name: account.acc_name,
            account_number: account.acc_number,
            credit_amount: account.acc_balance_type === "C" ? endingBalance : 0,
            debit_amount: account.acc_balance_type === "D" ? endingBalance : 0,
          });
          listJournal.push({
            acc_number: account.acc_number,
            acc_name: account.acc_name,
            credit_amount: account.acc_balance_type === "C" ? endingBalance : 0,
            debit_amount: account.acc_balance_type === "D" ? endingBalance : 0,
            journal_info: `Close Period ${query.end_date}`,
          });
        }
      }
      const profite_loss = await this.totalProfiteLoss.execute({
        start_date: lastDayOfYear.toISOString().split("T")[0],
        end_date: query.end_date,
      });
      const getSystem = await this.systemRepo.findOneLatest({});
      const profitLossAccount = await this.accountRepository.findOne({
        acc_number: getSystem.retained_earnings_acc,
      });

      listResult.map((result) => {
        listJournal.push({
          acc_name: profitLossAccount.acc_name,
          acc_number: profitLossAccount.acc_number,
          credit_amount: result.debit_amount,
          debit_amount: result.credit_amount,
          journal_info: `Close Period ${query.end_date}`,
        });
      });

      return {
        list_account: listResult,
        profite_loss_amount: profite_loss,
        list_journal: listJournal,
        profite_loss_name: `Laba/Rugi Berjalan ${
          lastDayOfYear.toISOString().split("T")[0]
        } - ${query.end_date}`,
      };
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
