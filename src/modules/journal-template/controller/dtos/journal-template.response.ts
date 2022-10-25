import { ApiProperty } from "@nestjs/swagger";
import { IdResponseDTO } from "src/interface-adapter/dtos/id.response.dto";
import { IJournalTemplateResponse } from "src/interface-adapter/interfaces/journal-template/journal-template.interface";
import { IJournalDetailResponse } from "src/interface-adapter/interfaces/journal/journal.interface";

export class JournalTemplateResponseDTO
  extends IdResponseDTO
  implements IJournalTemplateResponse {
  constructor(props: IJournalTemplateResponse) {
    super(props._id);
    this.template_name = props.template_name;
    this.template_desc = props.template_desc;
    this.journal_notes = props.journal_notes;
    this.journal_detail = props.journal_detail;
    this.total_credit_amount = props.total_credit_amount;
    this.total_debit_amount = props.total_debit_amount;
  }

  @ApiProperty({ example: "Template 01" })
  template_name: string;

  @ApiProperty({ example: "Template Penjualan 24K" })
  template_desc: string;

  @ApiProperty({ example: "Penjualan 24K" })
  journal_notes: string;

  @ApiProperty({ example: [] })
  journal_detail: IJournalDetailResponse[];

  @ApiProperty({ example: 10000 })
  total_credit_amount: number;

  @ApiProperty({ example: 10000 })
  total_debit_amount: number;
}
