import { UnprocessableEntityException } from '@nestjs/common';
import { ValueObject } from 'src/core/base-classes/domain/value-object';
import { DomainPrimitive } from 'src/core/base-classes/types/domain-primitive.type';
import { ExceptionBadRequest } from 'src/core/exceptions/bad-request.exception';
import { Guard } from 'src/core/logic/guard';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (Guard.isEmpty(value)) {
      throw new ExceptionBadRequest('Nomor Akun tidak boleh kosong!');
    }

    if (!Guard.isEmail(value)) {
      throw new UnprocessableEntityException('Email tidak valid!');
    }
  }
}
