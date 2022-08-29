import { IsOptionalBoolean } from 'src/core/decorators/dto-decorators/optional-boolean.decorator';
import { IsOptionalString } from 'src/core/decorators/dto-decorators/optional-string.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class UpdateAccountRequestDTO {
  @IsOptionalString({ example: '100001' })
  acc_number?: string;

  @IsRequiredString({ example: 'KAS BESAR', uppercase: true })
  acc_name: string;

  @IsOptionalString({ example: 'RP', uppercase: true })
  acc_currency?: string;

  @IsOptionalString({ example: 'D', uppercase: true })
  acc_balance_type?: string;

  @IsOptionalString({ example: 'none' })
  acc_cashflow_type?: string;

  @IsOptionalString({ example: 'BS', uppercase: true })
  acc_statement?: string;

  @IsOptionalString({ example: 'transaction' })
  acc_type?: string;

  @IsOptionalString({ example: '100000' })
  acc_parents?: string;

  @IsOptionalBoolean({ example: false })
  acc_active?: boolean;
}
