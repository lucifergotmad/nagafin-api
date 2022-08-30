import { Module } from '@nestjs/common';
import { BalanceRepositoryModule } from './database/balance.repository.module';
import { BalanceUseCaseModule } from './use-cases/balance.use-case.module';
import { BalanceController } from './controller/balance.controller';

@Module({
  imports: [BalanceUseCaseModule, BalanceRepositoryModule],
  controllers: [BalanceController],
})
export class BalanceModule {}
