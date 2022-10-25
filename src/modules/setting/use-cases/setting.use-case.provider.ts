import { Provider } from "@nestjs/common";
import { SettingCashBank } from "./setting-cash-bank.use-case";
import { SettingCashflow } from "./setting-cashflow.use-case";
import { SettingRetainedEarning } from "./setting-retained-earning.use-case";

export const settingUseCaseProvider: Provider[] = [
  SettingCashBank,
  SettingRetainedEarning,
  SettingCashflow,
];
