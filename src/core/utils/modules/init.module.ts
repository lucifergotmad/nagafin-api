import { Module } from '@nestjs/common';
import { DateUtil } from './date/date.service';
import { HashUtil } from './hash/hash.service';
import { transactionProvider } from './transaction/transaction.provider';

@Module({
  providers: [DateUtil, HashUtil, ...transactionProvider],
  exports: [DateUtil, HashUtil, ...transactionProvider],
})
export class InitModule {}
