import { Inject, Provider } from "@nestjs/common";
import { SystemRepository } from "./system.repository.service";

export const InjectSystemRepository = Inject(SystemRepository.name);

export const systemRepositoryProvider: Provider = {
  provide: SystemRepository.name,
  useClass: SystemRepository,
};
