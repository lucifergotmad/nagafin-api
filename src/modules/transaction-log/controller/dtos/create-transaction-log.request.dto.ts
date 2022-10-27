import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreateTransactionLogRequestDTO {
  @IsRequiredString()
  transaction_name: string;

  @IsOptionalString()
  transaction_detail?: string;

  @IsRequiredString()
  created_by: string;
}
