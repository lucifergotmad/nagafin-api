import { OmitType } from '@nestjs/swagger';
import { CreateJournalTemplateRequestDTO } from './create-journal-template.request.dto';

export class UpdateJournalTemplateRequestDTO extends OmitType(
  CreateJournalTemplateRequestDTO,
  ['template_name'],
) {}
