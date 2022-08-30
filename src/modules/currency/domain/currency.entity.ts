import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { IHistoryUser } from 'src/interface-adapter/interfaces/history-user.interface';

export interface CurrencyProps extends IHistoryUser {
  currency_code: string;
  currency_name: string;
  exchange_rate: number;
  currency_status: boolean;
}

export class CurrencyEntity extends AggregateRoot<CurrencyProps> {
  constructor(props: CurrencyProps) {
    super(props);
  }

  static create(props: CurrencyProps) {
    return new CurrencyEntity(props);
  }
}
