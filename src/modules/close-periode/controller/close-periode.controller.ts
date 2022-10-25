import { Body, Get, Post, Query } from "@nestjs/common";
import { ControllerProperty } from "src/core/decorators/controller-decorators/class-decorators/controller-property.decorator";
import { AuthUser } from "src/core/decorators/controller-decorators/param-decorators/auth-user.decorator";
import { UserMongoEntity } from "src/modules/user/database/model/user.mongo-entity";
import { ClosePeriod } from "../use-cases/close-period.use-case";
import { GetListClosePeriodeAccount } from "../use-cases/get-close-periode.use-case";
import { ClosePeriodRequestDTO } from "./dtos/close-period.request.dto";
import { RequestGetListClosePeriodeDTO } from "./dtos/request-get-list-close-periode.dto";

@ControllerProperty("v1/close-periodes", "Close Periodes")
export class ClosePeriodeController {
  constructor(
    private readonly getListClosePeriode: GetListClosePeriodeAccount,
    private readonly closePeriod: ClosePeriod,
  ) {
    // fill above parentheses with use case / repository dependencies
  }

  @Get("list")
  get(@Query() query: RequestGetListClosePeriodeDTO) {
    return this.getListClosePeriode.execute(query);
  }

  @Post()
  save(
    @Body() body: ClosePeriodRequestDTO,
    @AuthUser() user: Partial<UserMongoEntity>,
  ) {
    return this.closePeriod.injectDecodedToken(user).execute(body);
  }
}
