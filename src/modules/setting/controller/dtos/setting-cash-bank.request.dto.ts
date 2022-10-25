import { IsArray } from "class-validator";

export class SettingCashBankRequestDTO {
  @IsArray()
  list_acc_bank: string[];

  @IsArray()
  list_acc_cash: string[];
}
