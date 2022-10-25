import { Inject, Provider } from "@nestjs/common";
import { BalanceRepository } from "./balance.repository.service";

export const InjectBalanceRepository = Inject(BalanceRepository.name);

export const balanceRepositoryProvider: Provider = {
  provide: BalanceRepository.name,
  useClass: BalanceRepository,
};
