import { IsArray } from 'class-validator';

export class SettingCashflowRequestDTO {
  @IsArray()
  list_acc_bank: string[];

  @IsArray()
  list_acc_cash: string[];
}
