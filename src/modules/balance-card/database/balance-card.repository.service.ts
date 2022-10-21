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
import {
  AccountIgnore,
  BalanceCardIgnore,
} from "src/core/constants/encryption/encryption-ignore";
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
  async getLastByNumber(acc: string): Promise<BalanceCardMongoEntity> {
    const result = await this.balanceCardModel.aggregate([
      {
        $match: {
          balance_acc: acc,
        },
      },
      {
        $sort: {
          balance_date: -1,
        },
      },
    ]);

    if (result.length > 0) {
      let lastDate = result[0].balance_date;
      const hasil = await this.balanceCardModel.aggregate([
        {
          $match: {
            balance_acc: acc,
            balance_date: lastDate,
          },
        },
        {
          $sort: {
            _id: -1,
          },
        },
        {
          $lookup: {
            from: "tm_accounts",
            localField: "balance_acc",
            foreignField: "acc_number",
            as: "detailAkun",
          },
        },
        {
          $unwind: {
            path: "$detailAkun",
            preserveNullAndEmptyArrays: true,
          },
        },
      ]);

      return this.encryptor.doDecrypt(hasil[0], [
        ...AccountIgnore,
        ...BalanceCardIgnore,
      ]);
    } else {
      return null;
    }
  }
  async findBySort(
    date: string,
    acc: string,
  ): Promise<BalanceCardMongoEntity[]> {
    const result = await this.balanceCardModel.aggregate([
      {
        $match: {
          balance_date: date,
          balance_acc: acc,
        },
      },
      {
        $sort: {
          journal_date: 1,
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    return this.encryptor.doDecrypt(result, this.ignore);
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

    const generateSaldoawal: ILedgerDetailReportResponse[] = listAccount.map(
      (item: AccountMongoEntity) => ({
        balance_acc: item.acc_number,
        balance_acc_name: item.acc_name,
        journal_date: start_date,
        journal_number: "SALDO AWAL",
        balance_amount: 0,
      }),
    );

    const processSaldoAwal: ILedgerDetailReportResponse[] = listAccount.map(
      (account: AccountMongoEntity) => {
        const index = result.findIndex(
          (item: ILedgerDetailReportResponse) =>
            account.acc_number === item.balance_acc,
        );
        if (index === -1) {
          return {
            balance_acc: account.acc_number,
            balance_acc_name: account.acc_name,
            journal_date: start_date,
            journal_number: "SALDO AWAL",
            balance_amount: 0,
          };
        } else {
          return this.encryptor.doDecrypt(result[index], [
            ...BalanceCardIgnore,
            "journal_date",
          ]);
        }
      },
    );

    const payload: ILedgerDetailReportResponse[] = !result.length
      ? generateSaldoawal
      : processSaldoAwal;

    return this.encryptor.doDecrypt(payload, [
      ...BalanceCardIgnore,
      "journal_date",
      "balance_acc_name",
    ]);
  }

  async ledgerReport({
    start_date,
    end_date,
    acc_number,
  }: LedgerReportRequestDTO): Promise<ILedgerReportResponse[]> {
    const filterAccount = acc_number ? { balance_acc: acc_number } : {};

    const result = await this.balanceCardModel.aggregate([
      {
        $match: {
          balance_date: {
            $gte: start_date,
            $lte: end_date,
          },
          ...filterAccount,
        },
      },
      {
        $sort: {
          balance_date: 1,
        },
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
        $group: {
          _id: {
            balance_acc: "$account.acc_number",
            balance_acc_name: "$account.acc_name",
          },
          detail_journal: {
            $push: {
              account: "$account",
              journal_date: "$balance_date",
              journal_number: "$journal_number",
              journal_info: "$description",
              debit_amount: {
                $cond: {
                  if: {
                    $or: [
                      {
                        $and: [
                          { $gt: ["$mutation_amount", 0] },
                          { $eq: ["$account.acc_balance_type", "D"] },
                        ],
                      },
                      {
                        $and: [
                          { $lt: ["$mutation_amount", 0] },
                          { $eq: ["$account.acc_balance_type", "C"] },
                        ],
                      },
                    ],
                  },
                  then: "$mutation_amount",
                  else: 0,
                },
              },
              credit_amount: {
                $cond: {
                  if: {
                    $or: [
                      {
                        $and: [
                          { $gt: ["$mutation_amount", 0] },
                          { $eq: ["$account.acc_balance_type", "C"] },
                        ],
                      },
                      {
                        $and: [
                          { $lt: ["$mutation_amount", 0] },
                          { $eq: ["$account.acc_balance_type", "D"] },
                        ],
                      },
                    ],
                  },
                  then: "$mutation_amount",
                  else: 0,
                },
              },
              balance_amount: "$ending_amount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          balance_acc: "$_id.balance_acc",
          balance_acc_name: "$_id.balance_acc_name",
          detail_journal: "$detail_journal",
        },
      },
      {
        $sort: {
          balance_acc: 1,
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, [
      ...BalanceCardIgnore,
      "journal_date",
    ]);
  }
}
