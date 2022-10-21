import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UpdateSystemRequestDTO } from "../controller/dtos/update-system.request.dto";
import { SystemMongoEntity } from "../database/model/system.mongo-entity";
import { SystemRepositoryPort } from "../database/system.repository.port";
import { InjectSystemRepository } from "../database/system.repository.provider";
import { SystemEntity } from "../domain/system.entity";

@Injectable()
export class UpdateSystem
  extends BaseUseCase
  implements IUseCase<UpdateSystemRequestDTO, MessageResponseDTO> {
  constructor(
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(
    request?: UpdateSystemRequestDTO,
  ): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await session.withTransaction(async () => {
        const system = await this.systemRepository.findOneLatest({});

        if (!system) {
          const systemEntity = SystemEntity.create({
            company_name: request.company_name,
            company_address: request.company_address,
            npwp: request.npwp,
            telephone_number: request.telephone_number,
            fax: request.fax,
            email: request.email,
            website: request.website,

            project_name: request.project_name,
            project_info: request.project_info,
            project_code: request.project_code,
            project_category: request.project_category,
            project_currency: request.project_currency,
            project_type: request.project_type,
            project_logo: request.project_logo,
          });

          await this.systemRepository.save(systemEntity, session);
        } else {
          const payload: Partial<SystemMongoEntity> = request;

          await this.systemRepository.update({}, payload, session);
        }
      });

      return new MessageResponseDTO("Berhasil Update system!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
