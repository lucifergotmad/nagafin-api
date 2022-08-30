import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

export interface BalanceProps {
  // put field interface here
  name: string;
}

export class BalanceEntity extends AggregateRoot<BalanceProps> {
  constructor(props: BalanceProps) {
    super(props);
  }

  static create(props: BalanceProps) {
    return new BalanceEntity(props);
  }
}
