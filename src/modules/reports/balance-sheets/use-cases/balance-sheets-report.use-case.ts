import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IProfitCloseResponse } from "src/interface-adapter/interfaces/profit-close/profit-close.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { GenerateEndingBalance } from "src/modules/balance-card/use-cases/get-ending-balance.usecase";
import { BalanceRepositoryPort } from "src/modules/balance/database/balance.repository.port";
import { InjectBalanceRepository } from "src/modules/balance/database/balance.repository.provider";
import { BalanceSheetResponse } from "../../profit-close/controller/profit-close-response.dto";
import { TotalProfitClose } from "../../profit-close/use-cases/total-profit-close.usecase";
import { BalanceSheetsReportRequestDTO } from "../controller/dtos/balance-sheets.request.dto";
import { BalanceSheetsReportResponse } from "../controller/dtos/balance-sheets.response";

@Injectable()
export class BalanceSheetsReport
  extends BaseUseCase
  implements IUseCase<BalanceSheetsReportRequestDTO, BalanceSheetResponse> {
  constructor(
    @InjectBalanceRepository
    private readonly balanceRepository: BalanceRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly generateEndingBalance: GenerateEndingBalance,
    private readonly totalProfitClose: TotalProfitClose,
  ) {
    super();
  }

  public async execute(
    data: BalanceSheetsReportRequestDTO,
  ): Promise<BalanceSheetResponse> {
    try {
      const listAccount = await this.accountRepository.findBy({
        acc_statement: "BS",
        acc_type: "transaction",
      });
      const listGroup = await this.accountRepository.findBy({
        acc_statement: "BS",
        acc_type: "group",
      });
      let debitData: IProfitCloseResponse[] = [];
      let creditData: IProfitCloseResponse[] = [];
      let group = listGroup.map((y) => {
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
      debitData.forEach((x) => {
        x.balance_detail.push({
          acc_name: "TOTAL " + x.parents_acc_name,
          acc_number: x.parents_acc_number,
          amount: x.balance_detail.reduce((a, b) => a + b.amount, 0),
          is_total: true,
        });
      });
      creditData.forEach((x) => {
        x.balance_detail.push({
          acc_name: "TOTAL " + x.parents_acc_name,
          acc_number: x.parents_acc_number,
          amount: x.balance_detail.reduce((a, b) => a + b.amount, 0),
          is_total: true,
        });
      });
      let totalProfit = await this.totalProfitClose.execute(data);
      creditData.push({
        amount: totalProfit,
        is_profit: true,
        balance_detail: [],
        parents_acc_name: "Laba/Rugi Berjalan Sampai Tanggal " + data.end_date,
        parents_acc_number: "0",
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
