import { Inject, Provider } from "@nestjs/common";
import { TransactionLogRepository } from "./transaction-log.repository.service";

export const InjectTransactionLogRepository = Inject(
  TransactionLogRepository.name,
);

export const transactionLogRepositoryProvider: Provider = {
  provide: TransactionLogRepository.name,
  useClass: TransactionLogRepository,
};
