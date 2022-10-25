import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface ICurrencyProps extends IHistoryUser {
  currency_code: string;
  currency_name: string;
  exchange_rate: number;
}

export class CurrencyEntity extends AggregateRoot<ICurrencyProps> {
  constructor(props: ICurrencyProps) {
    super(props);
  }

  static create(props: ICurrencyProps) {
    return new CurrencyEntity(props);
  }
}
