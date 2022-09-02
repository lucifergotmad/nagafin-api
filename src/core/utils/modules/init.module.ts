import { CacheModule, Module } from '@nestjs/common';
import { EnvModule } from 'src/infra/configs/env.module';
import { CacheUtil } from './cache/cache.service';
import { DateUtil } from './date/date.service';
import { HashUtil } from './hash/hash.service';
import { transactionProvider } from './transaction/transaction.provider';

@Module({
  imports: [CacheModule.register(), EnvModule],
  providers: [CacheUtil, DateUtil, HashUtil, ...transactionProvider],
  exports: [CacheUtil, DateUtil, HashUtil, ...transactionProvider],
})
export class InitModule {}
