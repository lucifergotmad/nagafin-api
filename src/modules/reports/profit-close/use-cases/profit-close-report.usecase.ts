import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IProfitCloseResponse } from "src/interface-adapter/interfaces/profit-close/profit-close.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { GenerateEndingBalance } from "src/modules/balance-card/use-cases/get-ending-balance.usecase";
import { TrialBalanceReportRequestDTO } from "../../trial-balance/controller/dtos/trial-balance-report.request.dto";
import { BalanceSheetResponse } from "../controller/profit-close-response.dto";

@Injectable()
export class ProfitCloseReport
  extends BaseUseCase
  implements IUseCase<TrialBalanceReportRequestDTO, BalanceSheetResponse> {
  constructor(
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly generateEndingBalance: GenerateEndingBalance,
  ) {
    super();
  }

  public async execute(
    data: TrialBalanceReportRequestDTO,
  ): Promise<BalanceSheetResponse> {
    try {
      const listAccount = await this.accountRepository.findBy({
        acc_statement: "PL",
        acc_type: "transaction",
      });
      const listGroup = await this.accountRepository.findBy({
        acc_statement: "PL",
        acc_type: "group",
      });
      const debitData: IProfitCloseResponse[] = [];
      const creditData: IProfitCloseResponse[] = [];
      const group = listGroup.map((y) => {
        if (y.acc_balance_type === "D") {
          debitData.push({
            balance_detail: [],
            parents_acc_name: y.acc_name,
            parents_acc_number: y.acc_number,
            amount: 0,
            is_profit: false,
          });
        } else {
          creditData.push({
            balance_detail: [],
            parents_acc_name: y.acc_name,
            parents_acc_number: y.acc_number,
            amount: 0,
            is_profit: false,
          });
        }
        return data;
      });

      for (const x of listAccount) {
        const amount = await this.generateEndingBalance.execute({
          balance_acc: x.acc_number,
          start_date: data.start_date,
          end_date: data.end_date,
        });

        if (x.acc_balance_type === "C") {
          const indexParent = creditData.findIndex(
            (y) => y.parents_acc_number === x.acc_parents,
          );

          creditData[indexParent].balance_detail.push({
            acc_name: x.acc_name,
            acc_number: x.acc_number,
            amount: amount,
            is_total: false,
          });
        } else {
          const indexParent = debitData.findIndex(
            (y) => y.parents_acc_number === x.acc_parents,
          );

          debitData[indexParent].balance_detail.push({
            acc_name: x.acc_name,
            acc_number: x.acc_number,
            amount: amount,
            is_total: false,
          });
        }
      }
      creditData.forEach((x) => {
        x.balance_detail.push({
          acc_name: "TOTAL " + x.parents_acc_name,
          acc_number: x.parents_acc_number,
          amount: x.balance_detail.reduce((a, b) => a + b.amount, 0),
          is_total: true,
        });
      });
      debitData.forEach((x) => {
        x.balance_detail.push({
          acc_name: "TOTAL " + x.parents_acc_name,
          acc_number: x.parents_acc_number,
          amount: x.balance_detail.reduce((a, b) => a + b.amount, 0),
          is_total: true,
        });
      });

      return {
        credit_data: creditData,
        debit_data: debitData,
      };
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
