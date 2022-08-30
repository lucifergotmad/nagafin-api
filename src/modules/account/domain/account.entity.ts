import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { DateVO } from 'src/core/value-objects/date.value-object';
import { AccountNumber } from './value-objects/account-number.value-object';

interface HistoryProps {
  created_by?: string;
  created_at?: DateVO;
  updated_by?: string;
  updated_at?: DateVO;
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
