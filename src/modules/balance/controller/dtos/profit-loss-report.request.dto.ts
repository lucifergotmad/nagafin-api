import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class ProfitLossReportRequestDTO {
  @IsRequiredString({ example: '2022-10-01' })
  start_date: string;

  @IsRequiredString({ example: '2021-10-01' })
  end_date: string;
}
