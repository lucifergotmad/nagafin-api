import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { ICashFlowDetailResponse } from "src/interface-adapter/interfaces/cash-flow/cash-flow.interface";
import { InjectAccountRepository } from "src/modules/account/database/account.repository.provider";
import { AccountRepository } from "src/modules/account/database/account.repository.service";
import { BalanceCardRepositoryPort } from "src/modules/balance-card/database/balance-card.repository.port";
import { InjectBalanceCardRepository } from "src/modules/balance-card/database/balance-card.repository.provider";
import { TotalProfitLoss } from "../../profit-loss/use-cases/total-profit-loss.usecase";
import { CashFlowReportRequestDTO } from "../controller/dtos/cash-flow.request.dto";
import { CashFlowReportResponse } from "../controller/dtos/cash-flow.response";

@Injectable()
export class CashFlowReport
  extends BaseUseCase
  implements IUseCase<CashFlowReportRequestDTO, CashFlowReportResponse> {
  constructor(
    @InjectBalanceCardRepository
    private readonly balanceCardRepository: BalanceCardRepositoryPort,
    @InjectAccountRepository
    private readonly accountRepository: AccountRepository,
    private readonly totalProfitLoss: TotalProfitLoss,
    private readonly util: Utils,
  ) {
    super();
  }

  public async execute(
    data: CashFlowReportRequestDTO,
  ): Promise<CashFlowReportResponse> {
    try {
      const listAccount = await this.accountRepository.findBy({
        acc_type: "transaction",
      });
      const totalProfitLoss = await this.totalProfitLoss.execute({
        end_date: this.util.date.getToday(),
        start_date: this.util.date.getToday(),
      });
      const resultOperasional: ICashFlowDetailResponse[] = [];
      const resultInvestasi: ICashFlowDetailResponse[] = [];
      const resultPendanaan: ICashFlowDetailResponse[] = [];
      const resultKasDanBank: ICashFlowDetailResponse[] = [];

      const startDate = new Date(Number(data.year) - 1, 12, 1);

      const endDate = new Date(
        Number(data.year),
        !Number(data.month) ? 12 : Number(data.month),
        1,
      );

      for (const data of listAccount) {
        const hasil: any = await this.balanceCardRepository.getLastByNumber(
          data.acc_number,
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0],
        );

        if (hasil) {
          if (hasil.detailAkun.acc_cashflow_type === "pendanaan") {
            resultPendanaan.push({
              acc_name: hasil.detailAkun.acc_name,
              balance_amount:
                hasil.detailAkun.acc_balance_type === "D"
                  ? hasil.ending_amount * -1
                  : hasil.ending_amount,
            });
          } else if (hasil.detailAkun.acc_cashflow_type === "investasi") {
            resultInvestasi.push({
              acc_name: hasil.detailAkun.acc_name,
              balance_amount:
                hasil.detailAkun.acc_balance_type === "D"
                  ? hasil.ending_amount * -1
                  : hasil.ending_amount,
            });
          } else if (hasil.detailAkun.acc_cashflow_type === "operasional") {
            resultOperasional.push({
              acc_name: hasil.detailAkun.acc_name,
              balance_amount:
                hasil.detailAkun.acc_balance_type === "D"
                  ? hasil.ending_amount * -1
                  : hasil.ending_amount,
            });
          } else if (
            hasil.detailAkun.acc_cashflow_type === "cash" ||
            hasil.detailAkun.acc_cashflow_type === "bank"
          ) {
            resultKasDanBank.push({
              acc_name: `Kas dan bank pada ${
                startDate.toISOString().split("T")[0]
              } - ${endDate.toISOString().split("T")[0]}`,
              balance_amount:
                hasil.detailAkun.acc_balance_type === "D"
                  ? hasil.ending_amount * -1
                  : hasil.ending_amount,
            });
          }
        }
      }

      let amount = 0;
      const finalKasDanBank: ICashFlowDetailResponse[] = resultKasDanBank.map(
        (x) => {
          amount += x.balance_amount;
          return {
            acc_name: x.acc_name,
            balance_amount: amount,
          };
        },
      );

      return new CashFlowReportResponse({
        profit_loss_amount: totalProfitLoss,
        operational_detail: resultOperasional,
        investment_detail: resultInvestasi,
        funding_detail: resultPendanaan,
        cash_and_bank: finalKasDanBank[finalKasDanBank.length - 1],
      });
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
