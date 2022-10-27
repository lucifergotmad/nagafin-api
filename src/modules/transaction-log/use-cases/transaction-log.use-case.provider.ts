import { Provider } from "@nestjs/common";
import { CreateTransactionLog } from "./create-transaction-log.use-case";
import { FindTransactionLog } from "./find-transaction-log.use-case";

export const transactionLogUseCaseProvider: Provider[] = [
  CreateTransactionLog,
  FindTransactionLog,
];
