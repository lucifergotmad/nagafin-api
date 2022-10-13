import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'src/core/base-classes/infra/repository.base';
import { Model } from 'mongoose';
import {
  BalanceMongoEntity,
  BalanceDocument,
} from './model/balance.mongo-entity';
import { BalanceEntity } from '../domain/balance.entity';
import { BalanceRepositoryPort } from './balance.repository.port';
import { BalanceMongoMapper } from './model/balance.mongo-mapper';
import { BalanceIgnore } from 'src/core/constants/encryption/encryption-ignore';
import { ILedgerDetailReportResponse } from 'src/interface-adapter/interfaces/ledger/ledger.interface';
import { LedgerReportRequestDTO } from 'src/modules/reports/ledger/controller/dtos/ledger.request.dto';
import { AccountMongoEntity } from 'src/modules/account/database/model/account.mongo-entity';

@Injectable()
export class BalanceRepository
  extends BaseRepository<BalanceMongoEntity, BalanceEntity>
  implements BalanceRepositoryPort {
  constructor(
    @InjectModel(BalanceMongoEntity.name)
    private balanceModel: Model<BalanceDocument>,
  ) {
    super(
      balanceModel,
      new BalanceMongoMapper(BalanceEntity, BalanceMongoEntity),
      BalanceIgnore,
    );
  }

  async balanceSheetsReport(transaction_date: string): Promise<any> {
    const result = await this.balanceModel.aggregate([
      {
        $match: {
          balance_date: {
            $lte: transaction_date,
          },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $lookup: {
          from: 'tm_accounts',
          localField: 'balance_acc',
          foreignField: 'acc_number',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
    ]);

    return this.encryptor.doDecrypt(result, BalanceIgnore);
  }

  async ledgerReport(
    { start_date, acc_number }: LedgerReportRequestDTO,
    listAccount: AccountMongoEntity[],
  ): Promise<ILedgerDetailReportResponse[]> {
    const filterAccount = acc_number ? { balance_acc: acc_number } : {};

    const result = await this.balanceModel.aggregate([
      {
        $match: {
          balance_date: {
            $lt: start_date,
          },
        },
      },
      {
        $group: {
          _id: '$balance_acc',
          credit_amount: {
            $first: '$ending_balance.credit_amount',
          },
          debit_amount: {
            $first: '$ending_balance.debit_amount',
          },
          balance_date: {
            $first: '$balance_date',
          },
        },
      },
      {
        $project: {
          _id: 0,
          balance_acc: '$_id',
          journal_date: '$balance_date',
          journal_number: 'SALDO AWAL',
          balance_amount: {
            $subtract: ['$debit_amount', '$credit_amount'],
          },
        },
      },
      {
        $match: filterAccount,
      },
      {
        $lookup: {
          from: 'tm_accounts',
          localField: 'balance_acc',
          foreignField: 'acc_number',
          as: 'account',
        },
      },
      {
        $unwind: '$account',
      },
      {
        $project: {
          balance_acc: '$balance_acc',
          balance_acc_name: '$account.acc_name',
          journal_date: '$journal_date',
          journal_number: '$journal_number',
          balance_amount: '$balance_amount',
        },
      },
    ]);

    const payload: ILedgerDetailReportResponse[] = !result.length
      ? listAccount.map((item: AccountMongoEntity) => ({
          balance_acc: item.acc_number,
          balance_acc_name: item.acc_name,
          journal_date: start_date,
          journal_number: 'SALDO AWAL',
          balance_amount: 0,
        }))
      : result;

    console.log(payload);

    return this.encryptor.doDecrypt(payload, [
      ...BalanceIgnore,
      'journal_date',
      'journal_number',
      'balance_acc_name',
    ]);
  }
}
