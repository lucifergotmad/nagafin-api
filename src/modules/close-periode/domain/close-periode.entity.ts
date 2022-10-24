import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface ClosePeriodeProps {
  // put field interface here
  name: string;
}

export class ClosePeriodeEntity extends AggregateRoot<ClosePeriodeProps> {
  constructor(props: ClosePeriodeProps) {
    super(props);
  }

  static create(props: ClosePeriodeProps) {
    return new ClosePeriodeEntity(props);
  }
}
