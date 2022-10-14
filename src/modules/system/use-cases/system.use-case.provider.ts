import { Provider } from '@nestjs/common';
import { FindSystem } from './find-system.use-case';
import { UpdateSystem } from './update-system.use-case';

export const systemUseCaseProvider: Provider[] = [UpdateSystem, FindSystem];
