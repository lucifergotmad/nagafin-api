import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { IJournalProps } from '../../journal/domain/journal.entity';

export interface IJournalTemplateProps
  extends Omit<
    IJournalProps,
    'journal_number' | 'journal_date' | 'journal_status'
  > {
  template_name: string;
  template_desc: string;
}

export class JournalTemplateEntity extends AggregateRoot<IJournalTemplateProps> {
  constructor(props: IJournalTemplateProps) {
    super(props);
  }

  static create(props: IJournalTemplateProps) {
    return new JournalTemplateEntity(props);
  }
}
