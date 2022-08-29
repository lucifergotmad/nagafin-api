import { Body, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureDelete } from 'src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator';
import { SecurePost } from 'src/core/decorators/controller-decorators/class-decorators/secure-post.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { AuthUser } from 'src/core/decorators/controller-decorators/param-decorators/auth-user.decorator';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { UserMongoEntity } from 'src/modules/user/database/model/user.mongo-entity';
import { CreateAccount } from '../use-cases/create-account.use-case';
import { DeleteAccount } from '../use-cases/delete-account.use-case';
import { UpdateAccount } from '../use-cases/update-acount.use-case';
import { CreateAccountRequestDTO } from './dtos/create-account.request.dto';
import { UpdateAccountRequestDTO } from './dtos/update-account.request.dto';

@ControllerProperty('v1/accounts', '[Master] Accounts')
export class AccountController {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly updateAccount: UpdateAccount,
    private readonly deleteAccount: DeleteAccount,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  save(
    @Body() body: CreateAccountRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createAccount.injectDecodedToken(user).execute(body);
  }

  @SecurePut(':_id')
  @ApiOkResponse({ type: MessageResponseDTO })
  update(
    @Param('_id') _id: string,
    @Body() body: UpdateAccountRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateAccount
      .injectDecodedToken(user)
      .execute({ _id, ...body });
  }

  @SecureDelete(':_id')
  @ApiOkResponse({ type: MessageResponseDTO })
  delete(@Param('_id') _id: string) {
    return this.deleteAccount.execute({ _id });
  }
}
