import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class LedgerReportRequestDTO {
  @IsOptionalString({ example: "100000" })
  acc_number?: string;

  @IsRequiredString({ example: "2022-09-06" })
  start_date: string;

  @IsRequiredString({ example: "2022-09-06" })
  end_date: string;
}
