import { IsOptionalBoolean } from 'src/core/decorators/dto-decorators/optional-boolean.decorator';
import { IsOptionalNumber } from 'src/core/decorators/dto-decorators/optional-number.decorator';
import { IsRequiredMixed } from 'src/core/decorators/dto-decorators/required-mixed.decorator';
import { IsRequiredNumber } from 'src/core/decorators/dto-decorators/required-number.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

class JournalDetailRequestDTO {
  @IsRequiredString({ example: '100000' })
  acc_number: string;

  @IsRequiredNumber({ example: 10000 })
  credit_amount: number;

  @IsRequiredNumber({ example: 10000 })
  debit_amount: number;

  @IsRequiredString({ example: 'NGG-JLM/281000/001' })
  journal_info: string;
}

export class CreateJournalRequestDTO {
  @IsRequiredString({ example: 'JNF-220831-0001' })
  journal_number: string;

  @IsRequiredString({ example: '28 October 2022' })
  journal_notes: string;

  @IsRequiredString({ example: '2022-08-22' })
  journal_date: string;

  @IsOptionalBoolean({ example: true })
  journal_status?: boolean;

  @IsOptionalNumber({ example: 10000 })
  total_credit_amount: number;

  @IsOptionalNumber({ example: 10000 })
  total_debit_amount: number;

  @IsRequiredMixed({
    type: JournalDetailRequestDTO,
    example: [
      {
        acc_number: '100000',
        credit_amount: 10000,
        debit_amount: 10000,
        journal_info: 'NGG-JLM/281000/001',
      },
    ],
  })
  journal_detail: Array<JournalDetailRequestDTO>;
}
