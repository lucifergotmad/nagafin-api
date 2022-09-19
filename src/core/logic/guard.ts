import { UserLevel } from '../constants/app/user/user-level.const';

export class Guard {
  static isEmpty(value: unknown): boolean {
    if (typeof value === 'number' || typeof value === 'boolean') {
      return false;
    }
    if (typeof value === 'undefined' || value === null) {
      return true;
    }
    if (value instanceof Date) {
      return false;
    }
    if (value instanceof Object && !Object.keys(value).length) {
      return true;
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return true;
      }
      if (value.every((item) => Guard.isEmpty(item))) {
        return true;
      }
    }
    if (value === '') {
      return true;
    }

    return false;
  }

  static isDuplicate(value: any[]): boolean {
    return !!value.find((value, index) => value.indexOf(value) !== index);
  }

  static isInvalidString(value: string): boolean {
    return /[^0-9A-Za-z_.-]+/.test(value);
  }

  static isNotPhoneNumber(value: string): boolean {
    return /[^0-9.+ ()-]+/.test(value);
  }

  static isNotDateString(value: string): boolean {
    return !/\d{4}-\d{2}-\d{2}/.test(value);
  }

  static isInvalidStringNumber(value: string): boolean {
    return /[^0-9.]+/.test(value);
  }

  static isInvalidLevel(value: string): boolean {
    return !Object.values(UserLevel).includes(value as UserLevel);
  }
}
