import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

interface IBalanceDetail {
  credit_amount: number;
  debit_amount: number;
}

interface IBalanceMutationDetail {
  credit_amount_in: number;
  debit_amount_in: number;
  credit_amount_out: number;
  debit_amount_out: number;
}

export interface IBalanceProps {
  balance_date: string;
  balance_acc: string;
  beginning_balance: IBalanceDetail;
  balance_mutation: IBalanceMutationDetail;
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
