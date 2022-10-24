import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class BalanceSheetsReportRequestDTO {
  @IsRequiredString({ example: "2022-09-01" })
  start_date: string;

  @IsRequiredString({ example: "2022-09-01" })
  end_date: string;
}
