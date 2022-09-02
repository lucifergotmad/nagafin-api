import { Provider } from '@nestjs/common';
import { CreateAccount } from './create-account.use-case';
import { DeleteAccount } from './delete-account.use-case';
import { FindAccountById } from './find-account-by-id.use-case';
import { FindAllAccount } from './find-all-account.use-case';
import { UpdateAccount } from './update-acount.use-case';

export const accountUseCaseProvider: Provider[] = [
  CreateAccount,
  UpdateAccount,
  DeleteAccount,
  FindAllAccount,
  FindAccountById,
];
