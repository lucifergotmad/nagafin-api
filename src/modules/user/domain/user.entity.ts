import { AggregateRoot } from 'src/core/base-classes/domain/aggregate-root';
import { HashUtil } from 'src/core/utils/modules/hash/hash.service';
import { Password } from './value-objects/password.value-object';

export interface UserProps {
  username: string;
  password: Password;
}

export interface UserFactoryProps extends Omit<UserProps, 'password'> {
  password: string;
}

export class UserEntity extends AggregateRoot<UserProps> {
  private static hashUtil: HashUtil = new HashUtil();

  constructor(props: UserProps) {
    super(props);
  }

  static async create(props: UserFactoryProps) {
    const password = await Password.create(props.password);

    return new UserEntity({
      username: props.username,
      password: password,
    });
  }
}
