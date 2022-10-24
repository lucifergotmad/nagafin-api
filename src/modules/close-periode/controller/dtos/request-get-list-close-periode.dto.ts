import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class RequestGetListClosePeriodeDTO {
  @IsRequiredString()
  end_date: string;
}
