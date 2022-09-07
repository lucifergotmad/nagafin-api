import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class ProFormaReportRequestDTO {
  @IsRequiredString()
  transaction_date: string;
}
