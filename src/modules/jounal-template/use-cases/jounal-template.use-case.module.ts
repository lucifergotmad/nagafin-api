import { Module } from '@nestjs/common';
import { JounalTemplateRepositoryModule } from '../database/jounal-template.repository.module';
import { jounalTemplateUseCaseProvider } from './jounal-template.use-case.provider';

@Module({
  imports: [JounalTemplateRepositoryModule],
  exports: jounalTemplateUseCaseProvider,
  providers: jounalTemplateUseCaseProvider,
})
export class JounalTemplateUseCaseModule {}
