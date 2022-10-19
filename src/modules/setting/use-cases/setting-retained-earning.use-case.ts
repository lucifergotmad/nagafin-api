import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { SystemRepositoryPort } from 'src/modules/system/database/system.repository.port';
import { InjectSystemRepository } from 'src/modules/system/database/system.repository.provider';

@Injectable()
export class SettingRetainedEarning
  extends BaseUseCase
  implements IUseCase<string, MessageResponseDTO> {
  constructor(
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(acc_number?: string): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    try {
      await session.withTransaction(async () => {
        await this.systemRepository.update(
          {},
          { retained_earnings_acc: acc_number },
          session,
        );
      });

      return new MessageResponseDTO('Berhasil setting laba ditahan!');
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
