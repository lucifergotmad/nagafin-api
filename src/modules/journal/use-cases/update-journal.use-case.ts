import { BadRequestException, Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { CreateBalanceCard } from "src/modules/balance-card/use-cases/create-balance-card.use-case";
import { UpdateJournalRequestDTO } from "../controller/dtos/update-journal.request.dto";
import { JournalRepositoryPort } from "../database/journal.repository.port";
import { InjectJournalRepository } from "../database/journal.repository.provider";
import { JournalMongoEntity } from "../database/model/journal.mongo-entity";
import { IJournalDetailProps } from "../domain/journal.entity";

@Injectable()
export class UpdateJournal
  extends BaseUseCase
  implements IUseCase<UpdateJournalRequestDTO & IId, MessageResponseDTO> {
  constructor(
    @InjectJournalRepository private journalRepository: JournalRepositoryPort,
    private readonly utils: Utils,
    private readonly createBalanceCard: CreateBalanceCard,
  ) {
    super();
  }

  public async execute({
    _id,
    ...data
  }: UpdateJournalRequestDTO & IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        const payload: Partial<JournalMongoEntity> = data;
        const createdAt = this.utils.date.formatDate(new Date(), "YYMMDD");
        const journalNumber = this.utils.generator.generateJournalNumber(
          createdAt,
        );
        const previousJournal = await this.journalRepository.findById(
          _id,
          session,
        );

        if (!previousJournal) {
          throw new BadRequestException("Journal tidak dapat ditemukan!");
        }

        const detailPayload: IJournalDetailProps[] = [];

        payload.journal_detail.forEach((edited) => {
          const prev = previousJournal.journal_detail.find(
            (find) => find.acc_number == edited.acc_number,
          );
          if (prev) {
            const calculatedCredit = edited.credit_amount - prev.credit_amount;
            const calculatedDebit = edited.debit_amount - prev.debit_amount;
            if (calculatedCredit || calculatedDebit) {
              detailPayload.push({
                acc_number: prev.acc_number,
                journal_info: prev.journal_info,
                credit_amount: calculatedCredit > 0 ? calculatedCredit : 0,
                debit_amount: calculatedDebit > 0 ? calculatedDebit : 0,
              });
            }
          } else {
            detailPayload.push(edited);
          }
        });

        await this.createBalanceCard.injectDecodedToken(this.user).execute(
          {
            ...data,
            journal_number: journalNumber,
            journal_detail: detailPayload,
          },
          session,
        );

        result = await this.journalRepository.update(
          { _id },
          { ...payload, journal_detail: detailPayload },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
