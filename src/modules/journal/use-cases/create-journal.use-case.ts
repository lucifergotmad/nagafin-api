import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateBalanceCard } from "src/modules/balance-card/use-cases/create-balance-card.use-case";
import { CreateJournalRequestDTO } from "../controller/dtos/create-journal.request.dto";
import { JournalRepositoryPort } from "../database/journal.repository.port";
import { InjectJournalRepository } from "../database/journal.repository.provider";
import { JournalEntity } from "../domain/journal.entity";

@Injectable()
export class CreateJournal
  extends BaseUseCase
  implements IUseCase<CreateJournalRequestDTO, IdResponseDTO> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
    private readonly createBalanceCard: CreateBalanceCard,
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
          "Nomor Journal telah digunakan!",
        );

        await this.createBalanceCard
          .injectDecodedToken(this.user)
          .execute(data, session);

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
