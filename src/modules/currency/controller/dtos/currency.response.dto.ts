import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { ICurrencyResponse } from 'src/interface-adapter/interfaces/currency/currency.interface';

export class CurrencyResponseDTO
  extends IdResponseDTO
  implements ICurrencyResponse {
  constructor(props: ICurrencyResponse) {
    super(props._id);
    this.currency_code = props.currency_code;
    this.currency_name = props.currency_name;
    this.exchange_rate = props.exchange_rate;
  }

  @ApiProperty({ example: 'IDR' })
  currency_code: string;

  @ApiProperty({ example: 'Indonesian Rupiah' })
  currency_name: string;

  @ApiProperty({ example: 1 })
  exchange_rate: number;
}
