import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { SystemResponseDTO } from "../controller/dtos/system.response.dto";
import { SystemRepositoryPort } from "../database/system.repository.port";
import { InjectSystemRepository } from "../database/system.repository.provider";

@Injectable()
export class FindSystem
  extends BaseUseCase
  implements IUseCase<never, SystemResponseDTO> {
  constructor(
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
  ) {
    super();
  }

  public async execute(): Promise<SystemResponseDTO> {
    try {
      const result = await this.systemRepository.findOneLatest({});

      return new SystemResponseDTO(result);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    }
  }
}
