import { OmitType } from '@nestjs/swagger';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';
import { CreateJournalRequestDTO } from 'src/modules/journal/controller/dtos/create-journal.request.dto';

export class CreateJournalTemplateRequestDTO extends OmitType(
  CreateJournalRequestDTO,
  ['journal_number', 'journal_date'],
) {
  @IsRequiredString({ example: 'Penjualan' })
  template_name: string;

  @IsRequiredString({ example: 'Data Penjualan' })
  template_desc: string;
}
