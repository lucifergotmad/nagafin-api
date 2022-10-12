import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IRepositoryResponse } from 'src/core/ports/interfaces/repository-response.interface';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { AccountRepositoryPort } from 'src/modules/account/database/account.repository.port';
import { InjectAccountRepository } from 'src/modules/account/database/account.repository.provider';
import { BalanceRepositoryPort } from 'src/modules/balance/database/balance.repository.port';
import { InjectBalanceRepository } from 'src/modules/balance/database/balance.repository.provider';
import { BalanceEntity } from 'src/modules/balance/domain/balance.entity';
import { CreateJournalRequestDTO } from '../controller/dtos/create-journal.request.dto';
import { JournalRepositoryPort } from '../database/journal.repository.port';
import { InjectJournalRepository } from '../database/journal.repository.provider';
import { JournalEntity } from '../domain/journal.entity';

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
          const account = await this.accountRepository.findOne({
            acc_number: item.acc_number,
            acc_active: true,
          });
          if (!account) throw new Error('Akun tidak dapat ditemukan!');

          const balance = await this.balanceRepository.findOneLatest({
            balance_date: data.journal_date,
            balance_acc: item.acc_number,
          });
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
}
