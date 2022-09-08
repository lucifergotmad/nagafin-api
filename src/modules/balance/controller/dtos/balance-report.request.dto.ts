import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class BalanceReportRequestDTO {
  @IsRequiredString({ example: '2022-09-01' })
  transaction_date: string;
}