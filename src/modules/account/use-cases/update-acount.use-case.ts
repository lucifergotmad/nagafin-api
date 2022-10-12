import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { IRepositoryResponse } from 'src/core/ports/interfaces/repository-response.interface';
import { Utils } from 'src/core/utils/utils.service';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { UpdateAccountRequestDTO } from '../controller/dtos/update-account.request.dto';
import { AccountRepositoryPort } from '../database/account.repository.port';
import { InjectAccountRepository } from '../database/account.repository.provider';
import { AccountMongoEntity } from '../database/model/account.mongo-entity';

@Injectable()
export class UpdateAccount
  extends BaseUseCase
  implements IUseCase<UpdateAccountRequestDTO & IId, MessageResponseDTO> {
  constructor(
    @InjectAccountRepository private accountRepository: AccountRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute({
    _id,
    ...data
  }: UpdateAccountRequestDTO & IId): Promise<MessageResponseDTO> {
    const session = await this.utils.transaction.startTransaction();
    let result: IRepositoryResponse;

    try {
      await session.withTransaction(async () => {
        await this.accountRepository.findOneOrThrow(
          { _id },
          'Akun tidak dapat ditemukan!',
        );

        const payload: Partial<AccountMongoEntity> = data;

        result = await this.accountRepository.update(
          { _id },
          { ...payload, edited_by: this.user?.username },
          session,
        );
      });

      return new MessageResponseDTO(`${result.n} documents updated!`);
    } catch (error) {
      throw new ResponseException(error.message, error.status, error.trace);
    } finally {
      await session.endSession;
    }
  }
}
