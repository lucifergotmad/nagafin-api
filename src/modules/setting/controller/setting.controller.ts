import { Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { SettingCashflow } from '../use-cases/setting-cashflow.use-case';
import { SettingCashflowRequestDTO } from './dtos/setting-cashflow.request.dto';

@ControllerProperty('v1/settings', '[Setting] Account')
export class SettingController {
  constructor(private readonly settingCashflow: SettingCashflow) {}

  @SecurePut('cashflow')
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: 'Data yang dikirimkan kosong!' })
  cashFlow(@Body() body: SettingCashflowRequestDTO) {
    return this.settingCashflow.execute(body);
  }
}
