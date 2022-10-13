import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IRepositoryResponse } from 'src/core/ports/interfaces/repository-response.interface';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { IPayloadJournalBalance } from 'src/interface-adapter/interfaces/journal/journal.interface';
import { IBalanceDetail } from 'src/interface-adapter/interfaces/trial-balance/trial-balance.interface';
import { AccountRepositoryPort } from 'src/modules/account/database/account.repository.port';
import { InjectAccountRepository } from 'src/modules/account/database/account.repository.provider';
import { BalanceRepositoryPort } from 'src/modules/balance/database/balance.repository.port';
import { InjectBalanceRepository } from 'src/modules/balance/database/balance.repository.provider';
import { BalanceEntity } from 'src/modules/balance/domain/balance.entity';
import { CreateJournalRequestDTO } from '../controller/dtos/create-journal.request.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';
import { IJournalDetailProps, JournalEntity } from '../domain/journal.entity';

@Injectable()
export class CreateJournal
  extends BaseUseCase
  implements IUseCase<CreateJournalRequestDTO, IdResponseDTO> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    @InjectBalanceRepository private balanceRepository: BalanceRepositoryPort,
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(data: CreateJournalRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.journalRepository.findOneAndThrow(
          { journal_number: data.journal_number },
          'Nomor Journal telah digunakan!',
        );

        for (const item of data.journal_detail) {
          const balance = await this.balanceRepository.findOneLatest({
            balance_acc: item.acc_number,
            balance_date: { $lte: data.journal_date },
          });

          if (!balance) {
            const payload = BalanceEntity.create({
              balance_acc: item.acc_number,
              balance_date: data.journal_date,
              beginning_balance: { credit_amount: 0, debit_amount: 0 },
              balance_mutation: {
                credit_amount: item.credit_amount,
                debit_amount: item.debit_amount,
              },
              ending_balance: {
                credit_amount: item.credit_amount,
                debit_amount: item.debit_amount,
              },
              journal_number: data.journal_number,
            });

            await this.balanceRepository.save(payload, session);
          } else {
            const payload = await this._preparePayload(item, data.journal_date);
            const amountValue: IBalanceDetail = {
              credit_amount: balance.balance_mutation.credit_amount,
              debit_amount: balance.balance_mutation.debit_amount,
            };

            switch (payload.status) {
              case 'IN':
                amountValue.credit_amount += payload.credit_amount;
                amountValue.debit_amount += payload.debit_amount;
                break;
              case 'OUT':
                amountValue.credit_amount += payload.credit_amount * -1;
                amountValue.debit_amount += payload.debit_amount * -1;
                break;
              default:
                throw new UnprocessableEntityException(
                  'Status payload tidak valid!',
                );
            }

            console.log('amountValue: ', amountValue);

            const endingValue = {
              credit_amount: balance.ending_balance.credit_amount,
              debit_amount: balance.ending_balance.debit_amount,
            };

            console.log('endingValue: ', endingValue);

            await this.balanceRepository.update(
              {
                balance_acc: item.acc_number,
                balance_date: { $gte: data.journal_date },
              },
              {
                balance_mutation: {
                  credit_amount: amountValue.credit_amount,
                  debit_amount: amountValue.debit_amount,
                },
                ending_balance: {
                  credit_amount: endingValue.credit_amount,
                  debit_amount: endingValue.debit_amount,
                },
              },
              session,
            );
          }
        }

        const journalEntity = JournalEntity.create({
          journal_number: data.journal_number,
          journal_date: data.journal_date,
          journal_notes: data.journal_notes,
          journal_detail: data.journal_detail,
          total_credit_amount: data?.total_credit_amount,
          total_debit_amount: data?.total_debit_amount,
          created_by: this.user?.username,
        });

        result = await this.journalRepository.save(journalEntity, session);
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }

  private async _preparePayload(
    item: IJournalDetailProps,
    date: string,
  ): Promise<IPayloadJournalBalance> {
    const account = await this.accountRepository.findOne({
      acc_number: item.acc_number,
      acc_active: true,
    });
    console.log(item);

    if (!account) throw new Error('Akun tidak dapat ditemukan!');

    const payload: IPayloadJournalBalance = {
      status: this._checkStatusPayload(account.acc_balance_type, item),
      balance_acc: account.acc_number,
      balance_date: date,
      credit_amount: item.credit_amount,
      debit_amount: item.debit_amount,
    };

    return payload;
  }

  private _checkStatusPayload(
    acc_balance_type: string,
    item: IJournalDetailProps,
  ): string {
    return acc_balance_type !== 'D' &&
      item.credit_amount > 0 &&
      !item.debit_amount
      ? 'IN'
      : 'OUT';
  }
}
