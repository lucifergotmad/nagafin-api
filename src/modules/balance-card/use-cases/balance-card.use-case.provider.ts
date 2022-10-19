import { Provider } from "@nestjs/common";
import { CreateBalanceCard } from "./create-balance-card.use-case";

export const balanceCardUseCaseProvider: Provider[] = [CreateBalanceCard];
