import { Provider } from "@nestjs/common";
import { CreateBalanceCard } from "./create-balance-card.use-case";
import { GenerateBeginningBalance } from "./get-beginning-balance-card.use-case";
import { GenerateEndingBalance } from "./get-ending-balance.usecase";
import { GenerateMutationBalance } from "./get-mutation-balance";

export const balanceCardUseCaseProvider: Provider[] = [
  CreateBalanceCard,
  GenerateBeginningBalance,
  GenerateMutationBalance,
  GenerateEndingBalance,
];
