import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { AccountNumber } from './value-objects/account-number.value-object';

interface HistoryProps {
  created_by: string;
  updated_by?: string;
}

export interface AccountProps extends HistoryProps {
  acc_number: AccountNumber;
  acc_name: string;
  acc_currency: string;
  acc_balance_type: string;
  acc_cashflow_type: string;
  acc_statement: string;
  acc_type: string;
  acc_parents?: string;
  acc_active?: boolean;
}

interface AccountPropsFactory extends Omit<AccountProps, 'acc_number'> {
  acc_number: string;
}

export class AccountEntity extends AggregateRoot<AccountProps> {
  constructor(props: AccountProps) {
    super(props);
  }

  static create(props: AccountPropsFactory) {
    return new AccountEntity({
      ...props,
      acc_number: new AccountNumber(props.acc_number),
    });
  }
}
