import { IsOptionalBoolean } from 'src/core/decorators/dto-decorators/optional-boolean.decorator';
import { IsOptionalNumber } from 'src/core/decorators/dto-decorators/optional-number.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class UpdateCurrencyRequestDTO {
  @IsRequiredString({ example: 'Indonesian Rupiah' })
  currency_name: string;

  @IsOptionalNumber({ example: 1 })
  exchange_rate: number;
}
