import { IsOptionalBoolean } from "src/core/decorators/dto-decorators/optional-boolean.decorator";
import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class CreateAccountRequestDTO {
  @IsRequiredString({ example: "100001" })
  acc_number: string;

  @IsRequiredString({ example: "KAS BESAR", uppercase: true })
  acc_name: string;

  @IsRequiredString({ example: "ID", uppercase: true })
  acc_currency: string;

  @IsRequiredString({ example: "D", uppercase: true })
  acc_balance_type: string;

  @IsOptionalString({ example: "cash" })
  acc_cashflow_type: string;

  @IsRequiredString({ example: "BS", uppercase: true })
  acc_statement: string;

  @IsRequiredString({ example: "transaction" })
  acc_type: string;

  @IsOptionalString({ example: "100000" })
  acc_parents: string;

  @IsOptionalBoolean({ example: true })
  acc_active: boolean;
}
