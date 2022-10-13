import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

interface IBalanceDetail {
  credit_amount: number;
  debit_amount: number;
}

export interface IBalanceProps {
  balance_date: string;
  balance_acc: string;
  beginning_balance: IBalanceDetail;
  balance_mutation: IBalanceDetail;
  ending_balance: IBalanceDetail;
  journal_number: string;
}

export class BalanceEntity extends AggregateRoot<IBalanceProps> {
  constructor(props: IBalanceProps) {
    super(props);
  }

  static create(props: IBalanceProps) {
    return new BalanceEntity(props);
  }
}
