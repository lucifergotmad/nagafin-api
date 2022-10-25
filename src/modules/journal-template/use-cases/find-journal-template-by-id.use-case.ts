import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { IId } from "src/interface-adapter/interfaces/id.interface";
import { JournalTemplateResponseDTO } from "../controller/dtos/journal-template.response";
import { JournalTemplateRepositoryPort } from "../database/journal-template.repository.port";
import { InjectJournalTemplateRepository } from "../database/journal-template.repository.provider";

@Injectable()
export class FindJournalTemplateById
  extends BaseUseCase
  implements IUseCase<IId, JournalTemplateResponseDTO> {
  constructor(
    @InjectJournalTemplateRepository
    private journalTemplateRepository: JournalTemplateRepositoryPort,
  ) {
    super();
  }

  public async execute({ _id }: IId): Promise<JournalTemplateResponseDTO> {
    try {
      await this.journalTemplateRepository.findOneOrThrow(
        { _id },
        "Template Journal tidak dapat ditemukan!",
      );

      return new JournalTemplateResponseDTO(
        await this.journalTemplateRepository.findById(_id),
      );
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
