import { Inject, Provider } from "@nestjs/common";
import { BalanceCardRepository } from "./balance-card.repository.service";

export const InjectBalanceCardRepository = Inject(BalanceCardRepository.name);

export const balanceCardRepositoryProvider: Provider = {
  provide: BalanceCardRepository.name,
  useClass: BalanceCardRepository,
};
