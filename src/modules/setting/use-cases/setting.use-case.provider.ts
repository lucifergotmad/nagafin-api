import { Provider } from '@nestjs/common';
import { SettingCashflow } from './setting-cashflow.use-case';

export const settingUseCaseProvider: Provider[] = [SettingCashflow];
