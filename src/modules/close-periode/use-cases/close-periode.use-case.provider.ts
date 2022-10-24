import { Provider } from "@nestjs/common";
import { GetListClosePeriodeAccount } from "./get-close-periode.use-case";

export const closePeriodeUseCaseProvider: Provider[] = [
  GetListClosePeriodeAccount,
];
