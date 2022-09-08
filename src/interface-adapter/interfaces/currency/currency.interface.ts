import { IId } from '../id.interface';

export interface ICurrencyResponse extends IId {
  currency_code: string;
  currency_name: string;
  exchange_rate: number;
}
