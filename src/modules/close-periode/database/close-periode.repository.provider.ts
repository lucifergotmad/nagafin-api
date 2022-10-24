import { Inject, Provider } from "@nestjs/common";
import { ClosePeriodeRepository } from "./close-periode.repository.service";

export const InjectClosePeriodeRepository = Inject(ClosePeriodeRepository.name);

export const closePeriodeRepositoryProvider: Provider = {
  provide: ClosePeriodeRepository.name,
  useClass: ClosePeriodeRepository,
};
