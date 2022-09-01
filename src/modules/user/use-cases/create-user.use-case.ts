import { Injectable } from '@nestjs/common';
import { BaseUseCase } from 'src/core/base-classes/infra/use-case.base';
import { Utils } from 'src/core/utils/utils.service';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { UserRepositoryPort } from '../database/user.repository.port';
import { InjectUserRepository } from '../database/user.repository.provider';
import { UserEntity } from '../domain/user.entity';
import { IUseCase } from 'src/core/base-classes/interfaces/use-case.interface';
import { ResponseException } from 'src/core/exceptions/response.http-exception';
import { CreateUserRequestDTO } from '../controller/dtos/create-user.request.dto';

@Injectable()
export class CreateUser
  extends BaseUseCase
  implements IUseCase<CreateUserRequestDTO, IdResponseDTO> {
  constructor(
    @InjectUserRepository private userRepository: UserRepositoryPort,
    private readonly utils: Utils,
  ) {
    super();
  }

  public async execute(user: CreateUserRequestDTO): Promise<IdResponseDTO> {
    const session = await this.utils.transaction.startTransaction();

    try {
      await this.userRepository.findOneAndThrow({ user_id: user.username });

      const userEntity = await UserEntity.create({
        password: user.password,
        username: user.username,
        level: user.level,
      });

      const result = await this.userRepository.save(userEntity);
      await this.utils.transaction.commitTransaction(session);
      return new IdResponseDTO(result._id);
    } catch (err) {
      await this.utils.transaction.rollbackTransaction(session);
      throw new ResponseException(err.message, err.status, err.trace);
    }
  }
}
