import { ApiProperty } from "@nestjs/swagger";
import { IJournalReportsResponse } from "src/interface-adapter/interfaces/journal-reports/journal-reports.interface";

export class JournalReportsResponse implements IJournalReportsResponse {
  constructor(props: IJournalReportsResponse) {
    this.journal_date = props.journal_date;
    this.journal_notes = props.journal_notes;
    this.journal_number = props.journal_number;
    this.total_credit_amount = props.total_credit_amount;
    this.total_debit_amount = props.total_debit_amount;
    this.created_at = props.created_at;
    this.created_by = props.created_by;
  }

  @ApiProperty({ example: "JNF-220831-0001" })
  journal_number: string;

  @ApiProperty({ example: "28 October 2022" })
  journal_notes: string;

  @ApiProperty({ example: "2022-08-22" })
  journal_date: string;

  @ApiProperty({ example: 10000 })
  total_credit_amount: number;

  @ApiProperty({ example: 10000 })
  total_debit_amount: number;

  @ApiProperty({ example: "2022-08-22" })
  created_at: string;

  @ApiProperty({ example: "lucifer" })
  created_by: string;
}
