import { Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { ControllerProperty } from 'src/core/decorators/controller-decorators/class-decorators/controller-property.decorator';
import { SecureGet } from 'src/core/decorators/controller-decorators/class-decorators/secure-get.decorator';
import { SecurePut } from 'src/core/decorators/controller-decorators/class-decorators/secure-put.decorator';
import { MessageResponseDTO } from 'src/interface-adapter/dtos/message.response.dto';
import { FindSystem } from '../use-cases/find-system.use-case';
import { UpdateSystem } from '../use-cases/update-system.use-case';
import { SystemResponseDTO } from './dtos/system.response.dto';
import { UpdateSystemRequestDTO } from './dtos/update-system.request.dto';

@ControllerProperty('v1/systems', '[Master] Systems')
export class SystemController {
  constructor(
    private readonly updateSystem: UpdateSystem,
    private readonly findSystem: FindSystem,
  ) {}

  @SecurePut()
  @ApiOkResponse({ type: MessageResponseDTO })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  update(@Body() body: UpdateSystemRequestDTO) {
    return this.updateSystem.execute(body);
  }

  @SecureGet()
  @ApiOkResponse({ type: SystemResponseDTO })
  findOne() {
    return this.findSystem.execute();
  }
}
