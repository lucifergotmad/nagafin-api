import { Injectable } from "@nestjs/common";
import { BaseUseCase } from "src/core/base-classes/infra/use-case.base";
import { IUseCase } from "src/core/base-classes/interfaces/use-case.interface";
import { TransactionLog } from "src/core/constants/app/transaction-log/transaction-log.const";
import { ResponseException } from "src/core/exceptions/response.http-exception";
import { Utils } from "src/core/utils/utils.service";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { SystemRepositoryPort } from "src/modules/system/database/system.repository.port";
import { InjectSystemRepository } from "src/modules/system/database/system.repository.provider";
import { CreateTransactionLog } from "src/modules/transaction-log/use-cases/create-transaction-log.use-case";

@Injectable()
export class SettingRetainedEarning
  extends BaseUseCase
  implements IUseCase<string, MessageResponseDTO> {
  constructor(
    @InjectSystemRepository
    private readonly systemRepository: SystemRepositoryPort,
    private readonly utils: Utils,
    private readonly createTransactionLog: CreateTransactionLog,
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

        await this.createTransactionLog.execute({
          transaction_name: TransactionLog.UpdateRetainedAccount,
          transaction_detail: acc_number,
          created_by: this.user?.username,
        });
      });

      return new MessageResponseDTO("Berhasil setting laba ditahan!");
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession();
    }
  }
}
