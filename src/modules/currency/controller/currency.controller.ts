import { Body, Param } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { SecurePost } from 'src/core/decorators/controller-decorators/class-decorators/secure-post.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { AuthUser } from 'src/core/decorators/controller-decorators/param-decorators/auth-user.decorator';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { UserMongoEntity } from 'src/modules/user/database/model/user.mongo-entity';
import { CreateCurrency } from '../use-cases/create-currency.use-case';
import { FindAllCurrency } from '../use-cases/find-all-currency.use-case';
import { FindCurrencyById } from '../use-cases/find-currency-by-id.use-case';
import { UpdateCurrency } from '../use-cases/update-currency.use-case';
import { CreateCurrencyRequestDTO } from './dtos/create-currency.request.dto';
import { CurrencyResponseDTO } from './dtos/currency.response';
import { UpdateCurrencyRequestDTO } from './dtos/update-currency.request.dto';

@ControllerProperty('v1/currencies', '[Master] Currencies')
export class CurrencyController {
  constructor(
    private readonly createCurrency: CreateCurrency,
    private readonly updateCurrency: UpdateCurrency,
    private readonly findCurrencyById: FindCurrencyById,
    private readonly findAllCurrency: FindAllCurrency,
  ) {}

  @SecureGet()
  @ApiOkResponse({ type: CurrencyResponseDTO, isArray: true })
  findAll() {
    return this.findAllCurrency.execute();
  }

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

  @SecureGet(':_id')
  @ApiOkResponse({ type: CurrencyResponseDTO })
  findOne(@Param('_id') _id: string) {
    return this.findCurrencyById.execute({ _id });
  }
}
