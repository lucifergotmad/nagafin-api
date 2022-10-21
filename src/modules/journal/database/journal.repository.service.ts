import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  JournalMongoEntity,
  JournalDocument,
} from "./model/journal.mongo-entity";
import { JournalEntity } from "../domain/journal.entity";
import { JournalRepositoryPort } from "./journal.repository.port";
import { JournalMongoMapper } from "./model/journal.mongo-mapper";
import { JournalIgnore } from "src/core/constants/encryption/encryption-ignore";
import { LedgerReportRequestDTO } from "src/modules/reports/ledger/controller/dtos/ledger.request.dto";
import { LedgerReportResponse } from "src/modules/reports/ledger/controller/dtos/ledger.response";

@Injectable()
export class JournalRepository
  extends BaseRepository<JournalMongoEntity, JournalEntity>
  implements JournalRepositoryPort {
  constructor(
    @InjectModel(JournalMongoEntity.name)
    private journalModel: Model<JournalDocument>,
  ) {
    super(
      journalModel,
      new JournalMongoMapper(JournalEntity, JournalMongoEntity),
      JournalIgnore,
    );
  }
  async findAllAndSort(): Promise<JournalMongoEntity[]> {
    const result = await this.journalModel.aggregate([
      {
        $sort: {
          journal_date: -1,
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    return this.encryptor.doDecrypt(result, [...JournalIgnore, "balance_acc"]);
  }

  async isUsedInTransaction(acc_number: string): Promise<boolean> {
    const journal = await this.journalModel.findOne({
      "journal_detail.acc_number": acc_number,
    });
    return journal ? true : false;
  }

  async ledgerReport(
    filter: LedgerReportRequestDTO,
  ): Promise<LedgerReportResponse[]> {
    const filterAccount = filter.acc_number
      ? { balance_acc: filter.acc_number }
      : {};

    const result = await this.journalModel.aggregate([
      {
        $match: {
          journal_date: {
            $gte: filter.start_date,
            $lte: filter.end_date,
          },
        },
      },
      {
        $unwind: "$journal_detail",
      },
      {
        $group: {
          _id: "$journal_detail.acc_number",
          detail_journal: {
            $push: {
              journal_date: "$journal_date",
              journal_number: "$journal_number",
              journal_info: "$journal_detail.journal_info",
              debit_amount: "$journal_detail.debit_amount",
              credit_amount: "$journal_detail.credit_amount",
              balance_amount: {
                $subtract: [
                  "$journal_detail.debit_amount",
                  "$journal_detail.credit_amount",
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          balance_acc: "$_id",
          detail_journal: "$detail_journal",
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
          detail_journal: "$detail_journal",
        },
      },
      {
        $sort: {
          balance_acc: 1,
        },
      },
    ]);

    return this.encryptor.doDecrypt(result, [...JournalIgnore, "balance_acc"]);
  }
}
