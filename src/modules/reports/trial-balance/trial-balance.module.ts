import { Module } from '@nestjs/common';
import { TrialBalanceUseCaseModule } from './use-cases/trial-balance.use-case.module';
import { TrialBalanceController } from './controller/trial-balance.controller';

@Module({
  imports: [TrialBalanceUseCaseModule],
  controllers: [TrialBalanceController],
})
export class TrialBalanceModule {}
