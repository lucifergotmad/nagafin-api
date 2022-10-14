import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { Email } from './value-objects/email.value-object';
import { TelephoneNumber } from './value-objects/telephone-number.value-object';

export interface IProjectProps {
  project_name: string;
  project_info: string;
  project_code: string;
  project_category?: string;
  project_type?: string;
  project_currency?: string;
  project_logo?: string;
}

export interface ISystemProps extends IProjectProps {
  company_name: string;
  company_address: string;
  npwp: string;
  telephone_number: TelephoneNumber;
  fax: string;
  email: Email;
  website: string;
  retained_earning_acc?: string;
  period_closing_date?: string;
  closed_by?: string;
}

interface SystemPropsFactory
  extends Omit<ISystemProps, 'telephone_number' | 'email'> {
  telephone_number: string;
  email: string;
}

export class SystemEntity extends AggregateRoot<ISystemProps> {
  constructor(props: ISystemProps) {
    super(props);
  }

  static create(props: SystemPropsFactory) {
    return new SystemEntity({
      ...props,
      telephone_number: new TelephoneNumber(props.telephone_number),
      email: new Email(props.email),
    });
  }
}
