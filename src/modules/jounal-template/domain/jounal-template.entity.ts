import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { IJournalProps } from '../../journal/domain/journal.entity';

export interface IJounalTemplateProps
  extends Omit<
    IJournalProps,
    'journal_number' | 'journal_date' | 'journal_status'
  > {
  template_name: string;
  template_desc: string;
}

export class JounalTemplateEntity extends AggregateRoot<IJounalTemplateProps> {
  constructor(props: IJounalTemplateProps) {
    super(props);
  }

  static create(props: IJounalTemplateProps) {
    return new JounalTemplateEntity(props);
  }
}
