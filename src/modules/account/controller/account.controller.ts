import { Body, Param, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { APIQueryProperty } from "src/core/decorators/controller-decorators/class-decorators/api-query-property.decorator";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureDelete } from "src/core/decorators/controller-decorators/class-decorators/secure-delete.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePost } from "src/core/decorators/controller-decorators/class-decorators/secure-post.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { CreateAccount } from "../use-cases/create-account.use-case";
import { DeleteAccount } from "../use-cases/delete-account.use-case";
import { FindAccountById } from "../use-cases/find-account-by-id.use-case";
import { FindAllAccount } from "../use-cases/find-all-account.use-case";
import { FindCashFlowAccount } from "../use-cases/find-cashflow-account.use-case";
import { UpdateAccount } from "../use-cases/update-acount.use-case";
import { AccountResponseDTO } from "./dtos/account.response.dto";
import { CreateAccountRequestDTO } from "./dtos/create-account.request.dto";
import { FindAllAccountRequestDTO } from "./dtos/find-all-account.request.dto";
import { UpdateAccountRequestDTO } from "./dtos/update-account.request.dto";

@ControllerProperty("v1/accounts", "[Master] Accounts")
export class AccountController {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly updateAccount: UpdateAccount,
    private readonly deleteAccount: DeleteAccount,
    private readonly findAllAccount: FindAllAccount,
    private readonly findAccountById: FindAccountById,
    private readonly findCashflowAccount: FindCashFlowAccount,
  ) {}

  @SecurePost()
  @ApiOkResponse({ type: IdResponseDTO })
  save(
    @Body() body: CreateAccountRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.createAccount.injectDecodedToken(user).execute(body);
  }

  @SecureGet()
  @APIQueryProperty(["acc_type"])
  @ApiOkResponse({ type: AccountResponseDTO, isArray: true })
  find(@Query() query: FindAllAccountRequestDTO) {
    return this.findAllAccount.execute(query);
  }

  @SecureGet(":_id")
  @ApiOkResponse({ type: AccountResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  findOne(@Param("_id") _id: string) {
    return this.findAccountById.execute({ _id });
  }

  @SecureGet(":type/cashflow")
  @ApiOkResponse({ type: AccountResponseDTO, isArray: true })
  @ApiBadRequestResponse({ description: "Type not valid!" })
  findCashFlow(@Param("type") type: string) {
    return this.findCashflowAccount.execute(type);
  }

  @SecurePut(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  update(
    @Param("_id") _id: string,
    @Body() body: UpdateAccountRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.updateAccount
      .injectDecodedToken(user)
      .execute({ _id, ...body });
  }

  @SecureDelete(":_id")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Bad Request (ID not valid)" })
  delete(
    @Param("_id") _id: string,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.deleteAccount.injectDecodedToken(user).execute({ _id });
  }
}
