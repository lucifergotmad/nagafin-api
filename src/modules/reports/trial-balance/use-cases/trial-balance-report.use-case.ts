import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import {
  IBalanceDetail,
  ITrialBalanceDetailResponse,
  ITrialBalanceResponse,
} from "src/interface-adapter/interfaces/trial-balance/trial-balance.interface";
import { AccountRepositoryPort } from "src/modules/account/database/account.repository.port";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { GenerateBeginningBalance } from "src/modules/balance-card/use-cases/get-beginning-balance-card.use-case";
import { GenerateMutationBalance } from "src/modules/balance-card/use-cases/get-mutation-balance";
import { BalanceRepositoryPort } from "src/modules/balance/database/balance.repository.port";
import { InjectBalanceRepository } from "src/modules/balance/database/balance.repository.provider";
import { TrialBalanceReportRequestDTO } from "../controller/dtos/trial-balance-report.request.dto";
import { TrialBalanceReportResponse } from "../controller/dtos/trial-balance.response";

@Injectable()
export class TrialBalanceReport
  extends BaseUseCase
  implements
    IUseCase<TrialBalanceReportRequestDTO, TrialBalanceReportResponse[]> {
  constructor(
    @InjectBalanceRepository
    private readonly balanceRepository: BalanceRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepositoryPort,
    private readonly generateBeginningBalance: GenerateBeginningBalance,
    private readonly generateMutationBalance: GenerateMutationBalance,
  ) {
    super();
  }

  public async execute(
    data: TrialBalanceReportRequestDTO,
  ): Promise<TrialBalanceReportResponse[]> {
    try {
      const listAccount = await this.accountRepository.findBy({
        acc_statement: "BS",
        acc_type: "transaction",
      });
      const listGroup = await this.accountRepository.findBy({
        acc_statement: "BS",
        acc_type: "group",
      });
      const d = new Date();
      d.setDate(new Date(data.start_date).getDate() - 1);
      const startDate = d.toISOString().split("T")[0];
      let result: ITrialBalanceDetailResponse[] = [];
      let group = listGroup.map((y) => {
        const data: ITrialBalanceResponse = {
          balance_detail: [],
          parents_acc_name: y.acc_name,
          parents_acc_number: y.acc_number,
        };
        return data;
      });

      for (const x of listAccount) {
        const beginning = await this.generateBeginningBalance.execute({
          balance_acc: x.acc_number,
          start_date: startDate,
        });
        const mutation = await this.generateMutationBalance.execute({
          balance_acc: x.acc_number,
          start_date: data.start_date,
        });
        const indexParent = group.findIndex(
          (y) => y.parents_acc_number === x.acc_parents,
        );

        group[indexParent].balance_detail.push({
          acc_name: x.acc_name,
          acc_number: x.acc_number,
          beginning_balance: {
            credit_amount: x.acc_balance_type === "C" ? beginning : 0,
            debit_amount: x.acc_balance_type === "D" ? beginning : 0,
          },
          balance_mutation: {
            credit_amount: x.acc_balance_type === "C" ? mutation : 0,
            debit_amount: x.acc_balance_type === "D" ? mutation : 0,
          },
          ending_balance: {
            credit_amount:
              x.acc_balance_type === "C" ? beginning + mutation : 0,
            debit_amount: x.acc_balance_type === "D" ? beginning + mutation : 0,
          },
        });
      }

      return group;
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
