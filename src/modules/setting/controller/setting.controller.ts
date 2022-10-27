import { Body, Param } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { SettingCashBank } from "../use-cases/setting-cash-bank.use-case";
import { SettingCashflow } from "../use-cases/setting-cashflow.use-case";
import { SettingRetainedEarning } from "../use-cases/setting-retained-earning.use-case";
import { SettingCashBankRequestDTO } from "./dtos/setting-cash-bank.request.dto";
import { SettingCashflowRequestDTO } from "./dtos/setting-cashflow.request.dto";

@ControllerProperty("v1/settings", "[Setting] Account")
export class SettingController {
  constructor(
    private readonly settingCashBank: SettingCashBank,
    private readonly settingRetainedEarning: SettingRetainedEarning,
    private readonly settingCashflow: SettingCashflow,
  ) {}

  @SecurePut("cash-bank")
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: "Data yang dikirimkan kosong!" })
  cashBank(@Body() body: SettingCashBankRequestDTO) {
    return this.settingCashBank.execute(body);
  }

  @SecurePut("retained_earning/:acc_number")
  @ApiOkResponse({ type: MessageResponseDTO })
  retainedEarning(
    @Param("acc_number") acc_number: string,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.settingRetainedEarning
      .injectDecodedToken(user)
      .execute(acc_number);
  }

  @SecurePut("cashflow")
  @ApiOkResponse({ type: MessageResponseDTO })
  cashFlow(@Body() body: SettingCashflowRequestDTO) {
    return this.settingCashflow.execute(body);
  }
}
