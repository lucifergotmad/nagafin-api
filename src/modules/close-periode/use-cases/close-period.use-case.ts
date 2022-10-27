import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { CreateBalanceCard } from "src/modules/balance-card/use-cases/create-balance-card.use-case";
import { JournalRepositoryPort } from "src/modules/journal/database/journal.repository.port";
import { InjectJournalRepository } from "src/modules/journal/database/journal.repository.provider";
import { JournalEntity } from "src/modules/journal/domain/journal.entity";
import { SystemRepositoryPort } from "src/modules/system/database/system.repository.port";
import { InjectSystemRepository } from "src/modules/system/database/system.repository.provider";
import { ClosePeriodRequestDTO } from "../controller/dtos/close-period.request.dto";

@Injectable()
export class ClosePeriod
  extends BaseUseCase
  implements IUseCase<ClosePeriodRequestDTO, MessageResponseDTO> {
  constructor(
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
    private readonly createBalanceCard: CreateBalanceCard,
  ) {
    super();
  }

  public async execute(
    request?: ClosePeriodRequestDTO,
  ): Promise<MessageResponseDTO> {
    console.log("a: ", request);

    const session = await this.utils.transaction.startTransaction();

    try {
      await session.withTransaction(async () => {
        const journalDate = this.utils.date.formatDate(new Date(), "YYMMDD");
        const journalNumber = this.utils.generator.generateJournalNumber(
          journalDate,
        );

        await this.journalRepository.findOneAndThrow(
          {
            journal_number: journalNumber,
          },
          "Nomor journal duplikat",
        );

        await this.createBalanceCard.injectDecodedToken(this.user).execute(
          {
            journal_number: journalNumber,
            journal_date: request.journal_date,
            ...request,
          },
          session,
        );

        const journalEntity = JournalEntity.create({
          journal_number: journalNumber,
          journal_date: request.journal_date,
          journal_notes: "CLOSE PERIOD",
          journal_detail: request.journal_detail,
          total_credit_amount: request.journal_detail.reduce(
            (a, b) => a + b.credit_amount,
            0,
          ),
          total_debit_amount: request.journal_detail.reduce(
            (a, b) => a + b.debit_amount,
            0,
          ),
          created_by: this.user?.username,
        });

        await this.journalRepository.save(journalEntity, session);

        await this.systemRepository.update(
          {},
          { period_closing_date: request.journal_date },
          session,
        );
      });

      return new MessageResponseDTO("Berhasil tutup periode!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
