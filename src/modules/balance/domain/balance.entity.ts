import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

interface IBalanceDetail {
  credit_amount: number;
  debit_amount: number;
}

export interface IBalanceProps {
  balance_acc: string;
  ending_balance: IBalanceDetail;
}

export class BalanceEntity extends AggregateRoot<IBalanceProps> {
  constructor(props: IBalanceProps) {
    super(props);
  }

  static create(props: IBalanceProps) {
    return new BalanceEntity(props);
  }
}
