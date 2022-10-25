import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";

export class FindAllAccountRequestDTO {
  @IsOptionalString({ example: "transaction" })
  acc_type?: string;
}
