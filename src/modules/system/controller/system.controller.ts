import { Body } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { SecureGet } from "src/core/decorators/controller-decorators/class-decorators/secure-get.decorator";
import { SecurePut } from "src/core/decorators/controller-decorators/class-decorators/secure-put.decorator";
import { MessageResponseDTO } from "src/interface-adapter/dtos/message.response.dto";
import { AccountResponseDTO } from "src/modules/account/controller/dtos/account.response.dto";
import { FindRetainedEarning } from "../use-cases/find-retained-earning.use-case";
import { FindSystem } from "../use-cases/find-system.use-case";
import { UpdateSystem } from "../use-cases/update-system.use-case";
import { SystemResponseDTO } from "./dtos/system.response.dto";
import { UpdateSystemRequestDTO } from "./dtos/update-system.request.dto";

@ControllerProperty("v1/systems", "[Master] Systems")
export class SystemController {
  constructor(
    private readonly updateSystem: UpdateSystem,
    private readonly findSystem: FindSystem,
    private readonly findRetainedEarning: FindRetainedEarning,
  ) {}

  @SecurePut()
  @ApiOkResponse({ type: MessageResponseDTO })
  update(@Body() body: UpdateSystemRequestDTO) {
    return this.updateSystem.execute(body);
  }

  @SecureGet()
  @ApiOkResponse({ type: SystemResponseDTO })
  findOne() {
    return this.findSystem.execute();
  }

  @SecureGet("retained-earning")
  @ApiOkResponse({ type: AccountResponseDTO })
  retainedEarningHandler() {
    return this.findRetainedEarning.execute();
  }
}
