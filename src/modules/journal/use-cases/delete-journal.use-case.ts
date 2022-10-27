import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { CreateBalanceCard } from "src/modules/balance-card/use-cases/create-balance-card.use-case";
import { SystemRepositoryPort } from "src/modules/system/database/system.repository.port";
import { InjectSystemRepository } from "src/modules/system/database/system.repository.provider";
import { JournalRepositoryPort } from "../database/journal.repository.port";
import { InjectJournalRepository } from "../database/journal.repository.provider";
import { JournalEntity } from "../domain/journal.entity";

@Injectable()
export class DeleteJournal
  extends BaseUseCase
  implements IUseCase<IId, MessageResponseDTO> {
  constructor(
    @InjectJournalRepository
    private readonly journalRepository: JournalRepositoryPort,
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
    private readonly utils: Utils,
    private readonly createBalanceCard: CreateBalanceCard,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        const previousJournal = await this.journalRepository.findById(_id);

        if (!previousJournal) {
          throw new BadRequestException("Nomor journal tidak dapat ditemukan!");
        }

        await this.systemRepository.findOneAndThrow(
          {
            period_closing_date: { $gte: previousJournal.journal_date },
          },
          "Tidak bisa membuat journal di periode sebelumnya!",
        );

        const journalDate = this.utils.date.formatDate(new Date(), "YYMMDD");
        const journalNumber = this.utils.generator.generateJournalNumber(
          journalDate,
        );
        let totalCreditAmount = 0;
        let totalDebitAmount = 0;

        const detailJournal = previousJournal.journal_detail.map((detail) => ({
          ...detail,
          credit_amount: !detail.credit_amount ? detail.debit_amount : 0,
          debit_amount: !detail.debit_amount ? detail.credit_amount : 0,
        }));

        detailJournal.forEach((item) => {
          (totalCreditAmount += item.credit_amount),
            (totalDebitAmount += item.debit_amount);
        });

        await this.createBalanceCard.injectDecodedToken(this.user).execute(
          {
            journal_number: journalNumber,
            journal_date: this.utils.date.getToday(),
            journal_notes: `Hapus journal (${previousJournal.journal_number})`,
            journal_detail: detailJournal,
          },
          session,
        );

        const journalEntity = JournalEntity.create({
          journal_number: journalNumber,
          journal_date: this.utils.date.getToday(),
          journal_notes: `Hapus journal (${previousJournal.journal_number})`,
          journal_detail: detailJournal,
          total_credit_amount: totalCreditAmount,
          total_debit_amount: totalDebitAmount,
          created_by: this.user.username,
        });

        result = await this.journalRepository.save(journalEntity, session);
      });

      return new MessageResponseDTO(`${result.n} documents deleted!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
