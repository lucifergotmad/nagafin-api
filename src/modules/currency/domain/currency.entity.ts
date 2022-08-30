import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

export interface CurrencyProps {
  // put field interface here
  name: string;
}

export class CurrencyEntity extends AggregateRoot<CurrencyProps> {
  constructor(props: CurrencyProps) {
    super(props);
  }

  static create(props: CurrencyProps) {
    return new CurrencyEntity(props);
  }
}
