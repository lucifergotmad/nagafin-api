import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

export interface JournalProps {
  // put field interface here
  name: string;
}

export class JournalEntity extends AggregateRoot<JournalProps> {
  constructor(props: JournalProps) {
    super(props);
  }

  static create(props: JournalProps) {
    return new JournalEntity(props);
  }
}
