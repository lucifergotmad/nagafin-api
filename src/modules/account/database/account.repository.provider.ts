import { Inject, Provider } from "@nestjs/common";
import { AccountRepository } from "./account.repository.service";

export const InjectAccountRepository = Inject(AccountRepository.name);

export const accountRepositoryProvider: Provider = {
  provide: AccountRepository.name,
  useClass: AccountRepository,
};
