import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";
import { IHistoryUser } from "src/interface-adapter/interfaces/history-user.interface";

export interface ITransactionLogProps extends IHistoryUser {
  transaction_name: string;
  transaction_detail?: string;
  transaction_date: string;
}

export class TransactionLogEntity extends AggregateRoot<ITransactionLogProps> {
  constructor(props: ITransactionLogProps) {
    super(props);
  }

  static create(props: ITransactionLogProps) {
    return new TransactionLogEntity(props);
  }
}
