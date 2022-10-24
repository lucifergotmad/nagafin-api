import { Get, Query } from "@nestjs/common";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { GetListClosePeriodeAccount } from "../use-cases/get-close-periode.use-case";
import { RequestGetListClosePeriodeDTO } from "./dtos/request-get-list-close-periode.dto";

@ControllerProperty("v1/close-periodes", "Close Periodes")
export class ClosePeriodeController {
  constructor(
    private readonly getListClosePeriode: GetListClosePeriodeAccount,
  ) {
    // fill above parentheses with use case / repository dependencies
  }

  @Get("list")
  get(@Query() query: RequestGetListClosePeriodeDTO) {
    return this.getListClosePeriode.execute(query);
  }
}
