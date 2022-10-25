import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class JournalReportRequestDTO {
  @IsRequiredString()
  start_date: string;

  @IsRequiredString()
  end_date: string;
}
