import { IId } from 'src/interface-adapter/interfaces/id.interface';
import { IJournalResponse } from '../journal/journal.interface';

export interface IJournalTemplateResponse
  extends IId,
    Omit<
      IJournalResponse,
      'journal_number' | 'journal_date' | 'journal_status'
    > {
  template_name: string;
  template_desc: string;
}
