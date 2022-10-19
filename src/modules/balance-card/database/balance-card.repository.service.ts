import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  BalanceCardMongoEntity,
  BalanceCardDocument,
} from "./model/balance-card.mongo-entity";
import { BalanceCardEntity } from "../domain/balance-card.entity";
import { BalanceCardRepositoryPort } from "./balance-card.repository.port";
import { BalanceCardMongoMapper } from "./model/balance-card.mongo-mapper";
import { BalanceCardIgnore } from "src/core/constants/encryption/encryption-ignore";
import { LedgerReportRequestDTO } from "src/modules/reports/ledger/controller/dtos/ledger.request.dto";
import { AccountMongoEntity } from "src/modules/account/database/model/account.mongo-entity";
import {
  ILedgerDetailReportResponse,
  ILedgerReportResponse,
} from "src/interface-adapter/interfaces/ledger/ledger.interface";

@Injectable()
export class BalanceCardRepository
  extends BaseRepository<BalanceCardMongoEntity, BalanceCardEntity>
  implements BalanceCardRepositoryPort {
  constructor(
    @InjectModel(BalanceCardMongoEntity.name)
    private balanceCardModel: Model<BalanceCardDocument>,
  ) {
    super(
      balanceCardModel,
      new BalanceCardMongoMapper(BalanceCardEntity, BalanceCardMongoEntity),
      BalanceCardIgnore,
    );
  }

  async ledgerReportBeginning(
    { start_date, acc_number }: LedgerReportRequestDTO,
    listAccount: AccountMongoEntity[],
  ): Promise<ILedgerDetailReportResponse[]> {
    const filterAccount = acc_number ? { balance_acc: acc_number } : {};

    const result = await this.balanceCardModel.aggregate([
      {
        $match: {
          balance_date: {
            $lt: start_date,
          },
        },
      },
      {
        $group: {
          _id: "$balance_acc",
          credit_amount: {
            $first: "$ending_balance.credit_amount",
          },
          debit_amount: {
            $first: "$ending_balance.debit_amount",
          },
          balance_date: {
            $first: "$balance_date",
          },
        },
      },
      {
        $project: {
          _id: 0,
          balance_acc: "$_id",
          journal_date: "$balance_date",
          journal_number: "SALDO AWAL",
          balance_amount: {
            $subtract: ["$debit_amount", "$credit_amount"],
          },
        },
      },
      {
        $match: filterAccount,
      },
      {
        $lookup: {
          from: "tm_accounts",
          localField: "balance_acc",
          foreignField: "acc_number",
          as: "account",
        },
      },
      {
        $unwind: "$account",
      },
      {
        $project: {
          balance_acc: "$balance_acc",
          balance_acc_name: "$account.acc_name",
          journal_date: "$journal_date",
          journal_number: "$journal_number",
          balance_amount: "$balance_amount",
        },
      },
    ]);

    const payload: ILedgerDetailReportResponse[] = !result.length
      ? listAccount.map((item: AccountMongoEntity) => ({
          balance_acc: item.acc_number,
          balance_acc_name: item.acc_name,
          journal_date: start_date,
          journal_number: "SALDO AWAL",
          balance_amount: 0,
        }))
      : result.map((item: ILedgerDetailReportResponse) => {
          const index = listAccount.findIndex(
            (account: AccountMongoEntity) =>
              item.balance_acc === account.acc_number,
          );
          if (index === -1)
            return {
              balance_acc: item.balance_acc,
              balance_acc_name: item.balance_acc_name,
              journal_date: start_date,
              journal_number: "SALDO AWAL",
              balance_amount: 0,
            };

          return item;
        });

    return this.encryptor.doDecrypt(payload, [
      ...BalanceCardIgnore,
      "journal_date",
      "balance_acc_name",
    ]);
  }

  async ledgerReport(
    { start_date, end_date, acc_number }: LedgerReportRequestDTO,
    listAccount: AccountMongoEntity[],
  ): Promise<ILedgerReportResponse> {
    const filterAccount = acc_number ? { balance_acc: acc_number } : {};

    const result = await this.balanceCardModel.aggregate([
      {
        $match: {
          balance_date: {
            $gte: start_date,
            $lte: end_date,
          },
        },
      },
      {
        $group: {
          _id: "$balance_acc",
        },
      },
    ]);
  }
}
