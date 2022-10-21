import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CashFlowReportRequestDTO {
  @IsRequiredString({ example: "01" })
  month: string;

  @IsRequiredString({ example: "2022" })
  year: string;
}
