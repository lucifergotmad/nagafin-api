import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { IHistoryUser } from 'src/interface-adapter/interfaces/history-user.interface';
import { AccountNumber } from './value-objects/account-number.value-object';

export interface IAccountProps extends IHistoryUser {
  acc_number: AccountNumber;
  acc_name: string;
  acc_currency: string;
  acc_balance_type: string;
  acc_cashflow_type?: string;
  acc_statement: string;
  acc_type: string;
  acc_parents?: string;
  acc_active?: boolean;
}

interface AccountPropsFactory extends Omit<IAccountProps, 'acc_number'> {
  acc_number: string;
}

export class AccountEntity extends AggregateRoot<IAccountProps> {
  constructor(props: IAccountProps) {
    super(props);
  }

  static create(props: AccountPropsFactory) {
    return new AccountEntity({
      ...props,
      acc_number: new AccountNumber(props.acc_number),
    });
  }
}
