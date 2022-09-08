import { IsRequiredNumber } from 'src/core/decorators/dto-decorators/required-number.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class CreateCurrencyRequestDTO {
  @IsRequiredString({ example: 'IDR' })
  currency_code: string;

  @IsRequiredString({ example: 'Indonesian Rupiah' })
  currency_name: string;

  @IsRequiredNumber({ example: 1 })
  exchange_rate: number;
}
