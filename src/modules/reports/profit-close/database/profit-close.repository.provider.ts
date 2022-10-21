import { Inject, Provider } from "@nestjs/common";
import { ProfitCloseRepository } from "./profit-close.repository.service";

export const InjectProfitCloseRepository = Inject(ProfitCloseRepository.name);

export const profitCloseRepositoryProvider: Provider = {
  provide: ProfitCloseRepository.name,
  useClass: ProfitCloseRepository,
};
