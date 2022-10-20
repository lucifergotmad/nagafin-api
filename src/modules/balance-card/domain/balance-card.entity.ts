import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface IBalanceDetailCardProps {
  credit_amount: number;
  debit_amount: number;
}

export interface IBalanceCardProps
  extends Omit<IHistoryUser, "updated_at" | "updated_by"> {
  balance_date: string;
  balance_acc: string;
  // beginning_balance: IBalanceDetailCardProps;
  // balance_mutation: IBalanceDetailCardProps;
  // ending_balance: IBalanceDetailCardProps;
  beginning_amount: number;
  mutation_amount: number;
  ending_amount: number;
  description: string;
  journal_number: string;
}

export class BalanceCardEntity extends AggregateRoot<IBalanceCardProps> {
  constructor(props: IBalanceCardProps) {
    super(props);
  }

  static create(props: IBalanceCardProps) {
    return new BalanceCardEntity(props);
  }
}
