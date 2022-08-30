import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { IHistoryUser } from 'src/interface-adapter/interfaces/history-user.interface';

export interface IJournalDetailProps {
  acc_number: string;
  credit_amount: number;
  debit_amount: number;
  journal_info: string;
}

export interface IJournalProps extends IHistoryUser {
  journal_number: string;
  journal_notes: string;
  journal_date: string;
  total_credit_amount: number;
  total_debit_amount: number;
  journal_status: boolean;
  journal_detail: IJournalDetailProps;
}

export class JournalEntity extends AggregateRoot<IJournalProps> {
  constructor(props: IJournalProps) {
    super(props);
  }

  static create(props: IJournalProps) {
    return new JournalEntity(props);
  }
}
