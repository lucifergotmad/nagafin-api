import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import {
  IJournalDetailResponse,
  IJournalResponse,
} from 'src/interface-adapter/interfaces/journal/journal.interface';

class JournalDetailResponseDTO implements IJournalDetailResponse {
  constructor(props: IJournalDetailResponse) {
    this.acc_number = props.acc_number;
    this.credit_amount = props.credit_amount;
    this.debit_amount = props.debit_amount;
    this.journal_info = props.journal_info;
  }

  @ApiProperty({ example: '100000' })
  acc_number: string;

  @ApiProperty({ example: 10000 })
  credit_amount: number;

  @ApiProperty({ example: 10000 })
  debit_amount: number;

  @ApiProperty({ example: 'NGG-JLM/281000/001' })
  journal_info: string;
}

export class JournalResponseDTO
  extends IdResponseDTO
  implements IJournalResponse {
  constructor(props: IJournalResponse) {
    super(props._id);
  }

  @ApiProperty({ example: 'JNF-220831-0001' })
  journal_number: string;

  @ApiProperty({ example: '28 October 2022' })
  journal_notes: string;

  @ApiProperty({ example: '2022-08-22' })
  journal_date: string;

  @ApiProperty({ example: true })
  journal_status: boolean;

  @ApiProperty({ example: 10000 })
  total_credit_amount: number;

  @ApiProperty({ example: 10000 })
  total_debit_amount: number;

  @ApiProperty({ type: JournalDetailResponseDTO, isArray: true })
  journal_detail: Array<JournalDetailResponseDTO>;
}
