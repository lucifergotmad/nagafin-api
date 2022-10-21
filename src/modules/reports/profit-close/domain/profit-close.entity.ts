import { AggregateRoot } from "src/core/base-classes/domain/aggregate-root";

export interface ProfitCloseProps {
  // put field interface here
  name: string;
}

export class ProfitCloseEntity extends AggregateRoot<ProfitCloseProps> {
  constructor(props: ProfitCloseProps) {
    super(props);
  }

  static create(props: ProfitCloseProps) {
    return new ProfitCloseEntity(props);
  }
}
