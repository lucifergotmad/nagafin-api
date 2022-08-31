import { Body, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecurePost } from 'src/core/decorators/controller-decorators/class-decorators/secure-post.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { AuthUser } from 'src/core/decorators/controller-decorators/param-decorators/auth-user.decorator';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { UserMongoEntity } from 'src/modules/user/database/model/user.mongo-entity';
import { CreateCurrency } from '../use-cases/create-currency.use-case';
import { UpdateCurrency } from '../use-cases/update-currency.use-case';
import { CreateCurrencyRequestDTO } from './dtos/create-currency.request.dto';
import { UpdateCurrencyRequestDTO } from './dtos/update-currency.request.dto';

@ControllerProperty('v1/currencies', '[Master] Currencies')
export class CurrencyController {
  constructor(
    private readonly createCurrency: CreateCurrency,
    private readonly updateCurrency: UpdateCurrency,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  save(
    @Body() body: CreateCurrencyRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createCurrency.injectDecodedToken(user).execute(body);
  }

  @SecurePut(':_id')
  @ApiOkResponse({ type: MessageResponseDTO })
  update(
    @Param('_id') _id: string,
    @Body() body: UpdateCurrencyRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateCurrency
      .injectDecodedToken(user)
      .execute({ _id, ...body });
  }
}
