import { Module } from '@nestjs/common';
import { AccountRepositoryModule } from 'src/modules/account/database/account.repository.module';
import { settingUseCaseProvider } from './setting.use-case.provider';

@Module({
  imports: [AccountRepositoryModule],
  exports: settingUseCaseProvider,
  providers: settingUseCaseProvider,
})
export class SettingUseCaseModule {}
