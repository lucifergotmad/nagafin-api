import { Provider } from "@nestjs/common";
import { CreateCurrency } from "./create-currency.use-case";
import { DeleteCurrency } from "./delete-currency.use-case";
import { FindAllCurrency } from "./find-all-currency.use-case";
import { FindCurrencyById } from "./find-currency-by-id.use-case";
import { UpdateCurrency } from "./update-currency.use-case";

export const currencyUseCaseProvider: Provider[] = [
  CreateCurrency,
  UpdateCurrency,
  DeleteCurrency,
  FindCurrencyById,
  FindAllCurrency,
];
