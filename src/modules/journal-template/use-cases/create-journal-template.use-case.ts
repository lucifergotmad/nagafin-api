import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IRepositoryResponse } from "src/core/ports/interfaces/repository-response.interface";
import { Utils } from "src/core/utils/utils.service";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { CreateJournalTemplateRequestDTO } from "../controller/dtos/create-journal-template.request.dto";
import { JournalTemplateRepositoryPort } from "../database/journal-template.repository.port";
import { InjectJournalTemplateRepository } from "../database/journal-template.repository.provider";
import { JournalTemplateEntity } from "../domain/jounal-template.entity";

@Injectable()
export class CreateJournalTemplate
  extends BaseUseCase
  implements IUseCase<CreateJournalTemplateRequestDTO, IdResponseDTO> {
  constructor(
    @InjectJournalTemplateRepository
    private journalTemplateRepository: JournalTemplateRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    data: CreateJournalTemplateRequestDTO,
  ): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        const journalTemplateEntity = new JournalTemplateEntity({
          template_name: data.template_name,
          template_desc: data.template_desc,
          total_credit_amount: data.total_credit_amount,
          total_debit_amount: data.total_debit_amount,
          journal_notes: data.journal_notes,
          journal_detail: data.journal_detail,
          created_by: this.user?.username,
        });
        result = await this.journalTemplateRepository.save(
          journalTemplateEntity,
          session,
        );
      });

      return new IdResponseDTO(result._id);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
