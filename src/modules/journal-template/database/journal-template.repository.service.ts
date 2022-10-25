import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepository } from "src/core/base-classes/infra/repository.base";
import { Model } from "mongoose";
import {
  JournalTemplateMongoEntity,
  JournalTemplateDocument,
} from "./model/journal-template.mongo-entity";
import { JournalTemplateEntity } from "../domain/jounal-template.entity";
import { JournalTemplateRepositoryPort } from "./journal-template.repository.port";
import { JournalTemplateMongoMapper } from "./model/journal-template.mongo-mapper";
import { JournalTemplateIgnore } from "src/core/constants/encryption/encryption-ignore";

@Injectable()
export class JournalTemplateRepository
  extends BaseRepository<JournalTemplateMongoEntity, JournalTemplateEntity>
  implements JournalTemplateRepositoryPort {
  constructor(
    @InjectModel(JournalTemplateMongoEntity.name)
    private JounalTemplateModel: Model<JournalTemplateDocument>,
  ) {
    super(
      JounalTemplateModel,
      new JournalTemplateMongoMapper(
        JournalTemplateEntity,
        JournalTemplateMongoEntity,
      ),
      JournalTemplateIgnore,
    );
  }

  // fill me with beautiful method!
  __init__(): void {
    //replace this lonely method!
  }
}
