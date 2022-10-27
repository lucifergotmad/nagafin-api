import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class FindTransactionLogRequestDTO {
  @IsRequiredString()
  start_date: string;

  @IsRequiredString()
  end_date: string;

  @IsOptionalString()
  transaction_type?: string;
}
