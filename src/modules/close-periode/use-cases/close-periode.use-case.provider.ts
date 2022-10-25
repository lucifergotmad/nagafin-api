import { Provider } from "@nestjs/common";
import { ClosePeriod } from "./close-period.use-case";
import { GetListClosePeriodeAccount } from "./get-close-periode.use-case";

export const closePeriodeUseCaseProvider: Provider[] = [
  GetListClosePeriodeAccount,
  ClosePeriod,
];
