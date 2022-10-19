import { IsRequiredMixed } from 'src/core/decorators/dto-decorators/required-mixed.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

class SettingCashflowDetail {
  @IsRequiredString({ example: '1.000' })
  acc_number: string;

  @IsRequiredString({ example: 'cash' })
  acc_cashflow_type: string;
}

export class SettingCashflowRequestDTO {
  @IsRequiredMixed({
    type: SettingCashflowDetail,
    example: [{ acc_number: '1.000', acc_cashflow_type: 'none' }],
  })
  list_account: SettingCashflowDetail[];
}
