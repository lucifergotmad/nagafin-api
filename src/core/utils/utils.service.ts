import { Inject, Injectable } from '@nestjs/common';
import { ConnectionName } from 'src/core/constants/database/connection-name.const';
import { IUtils } from './utils.interface';
import { DateUtil } from './modules/date/date.service';
import { TransactionUtil } from './modules/transaction/transaction.service';
import { HashUtil } from './modules/hash/hash.service';

@Injectable()
export class Utils implements IUtils {
  constructor(
    readonly date: DateUtil,
    readonly hash: HashUtil,
    @Inject(ConnectionName.DB_PRIMARY) readonly transaction: TransactionUtil,
  ) {}
}
