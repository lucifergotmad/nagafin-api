import { Module } from '@nestjs/common';
import { JounalTemplateRepositoryModule } from './database/jounal-template.repository.module';
import { JounalTemplateUseCaseModule } from './use-cases/jounal-template.use-case.module';
import { JounalTemplateController } from './controller/jounal-template.controller';

@Module({
  imports: [JounalTemplateUseCaseModule, JounalTemplateRepositoryModule],
  controllers: [JounalTemplateController],
})
export class JounalTemplateModule {}
