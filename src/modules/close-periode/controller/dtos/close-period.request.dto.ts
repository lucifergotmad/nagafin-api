import { IsOptionalString } from "src/core/decorators/dto-decorators/optional-string.decorator";
import { IsRequiredMixed } from "src/core/decorators/dto-decorators/required-mixed.decorator";
import { IsRequiredNumber } from "src/core/decorators/dto-decorators/required-number.decorator";
import { IsRequiredString } from "src/core/decorators/dto-decorators/required-string.decorator";

export class ClosePeriodDetailRequestDTO {
  @IsRequiredString({ example: "100000" })
  acc_number: string;

  @IsRequiredNumber({ example: 10000 })
  credit_amount: number;

  @IsRequiredNumber({ example: 10000 })
  debit_amount: number;

  @IsRequiredString({ example: "NGG-JLM/281000/001" })
  journal_info: string;
}

export class ClosePeriodRequestDTO {
  @IsOptionalString({ example: "JNF-220831-0001" })
  journal_number?: string;

  @IsRequiredString({ example: "2022-08-22" })
  journal_date: string;

  @IsRequiredMixed({
    type: ClosePeriodDetailRequestDTO,
    example: [
      {
        acc_number: "100000",
        credit_amount: 10000,
        debit_amount: 10000,
        journal_info: "NGG-JLM/281000/001",
      },
    ],
  })
  journal_detail: Array<ClosePeriodDetailRequestDTO>;
}
