import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JounalTemplateModel } from './model/jounal-template.mongo-entity';
import { jounalTemplateRepositoryProvider } from './jounal-template.repository.provider';

@Module({
  imports: [MongooseModule.forFeature(JounalTemplateModel)],
  providers: [jounalTemplateRepositoryProvider],
  exports: [jounalTemplateRepositoryProvider],
})
export class JounalTemplateRepositoryModule {}
