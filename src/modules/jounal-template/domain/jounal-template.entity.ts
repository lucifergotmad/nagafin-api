import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';

export interface JounalTemplateProps {
  // put field interface here
  name: string;
}

export class JounalTemplateEntity extends AggregateRoot<JounalTemplateProps> {
  constructor(props: JounalTemplateProps) {
    super(props);
  }

  static create(props: JounalTemplateProps) {
    return new JounalTemplateEntity(props);
  }
}
