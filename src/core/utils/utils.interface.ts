import { IDateUtil } from './modules/date/date.interface';
import { IHashUtil } from './modules/hash/hash.interface';
import { ITransactionUtil } from './modules/transaction/transaction.interface';

export interface IUtils {
  date: IDateUtil;
  hash: IHashUtil;
  transaction: ITransactionUtil;
}
