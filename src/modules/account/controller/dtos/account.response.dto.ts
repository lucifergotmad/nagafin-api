import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import {
  IAccountResponse,
  IAccountTreeResponse,
  TIgnoreAccountChildren,
} from 'src/interface-adapter/interfaces/account/account.interface';

export class AccountResponseDTO
  extends IdResponseDTO
  implements IAccountResponse {
  constructor(props: IAccountResponse) {
    super(props._id);
    this.acc_number = props.acc_number;
    this.acc_name = props.acc_name;
    this.acc_currency = props.acc_currency;
    this.acc_balance_type = props.acc_balance_type;
    this.acc_cashflow_type = props.acc_cashflow_type;
    this.acc_statement = props.acc_statement;
    this.acc_type = props.acc_type;
    this.acc_parents = props?.acc_parents;
    this.used_as_parent = props?.used_as_parent;
    this.used_in_transaction = props?.used_in_transaction;
  }

  @ApiProperty({ example: '100001' })
  acc_number: string;

  @ApiProperty({ example: 'KAS BESAR' })
  acc_name: string;

  @ApiProperty({ example: 'IDR' })
  acc_currency: string;

  @ApiProperty({ example: 'D' })
  acc_balance_type: string;

  @ApiProperty({ example: 'cash' })
  acc_cashflow_type: string;

  @ApiProperty({ example: 'BS' })
  acc_statement: string;

  @ApiProperty({ example: 'transaction' })
  acc_type: string;

  @ApiProperty({ example: '100000' })
  acc_parents?: string;

  @ApiProperty({ example: true })
  used_as_parent?: boolean;

  @ApiProperty({ example: true })
  used_in_transaction?: boolean;
}

class AccountTreeChildrenResponseDTO
  implements Omit<IAccountTreeResponse, TIgnoreAccountChildren | '_id'> {
  constructor(
    props: Omit<IAccountTreeResponse, TIgnoreAccountChildren | '_id'>,
  ) {
    this.acc_name = props.acc_name;
    this.acc_number = props.acc_number;
    this.acc_statement = props.acc_statement;
    this.acc_type = props.acc_type;
    this.children = props.children;
  }

  @ApiProperty({ example: '100001' })
  acc_number: string;

  @ApiProperty({ example: 'KAS BESAR' })
  acc_name: string;

  @ApiProperty({ example: 'BS' })
  acc_statement: string;

  @ApiProperty({ example: 'transaction' })
  acc_type: string;

  @ApiProperty({ example: [] })
  children: Omit<IAccountTreeResponse, TIgnoreAccountChildren>[];
}

export class AccountTreeResponseDTO
  extends IdResponseDTO
  implements IAccountTreeResponse {
  constructor(props: IAccountTreeResponse) {
    super(props._id);
    this.acc_number = props.acc_number;
    this.acc_name = props.acc_name;
    this.acc_currency = props.acc_currency;
    this.acc_balance_type = props.acc_balance_type;
    this.acc_cashflow_type = props.acc_cashflow_type;
    this.acc_statement = props.acc_statement;
    this.acc_type = props.acc_type;
  }

  @ApiProperty({ example: '100001' })
  acc_number: string;

  @ApiProperty({ example: 'KAS BESAR' })
  acc_name: string;

  @ApiProperty({ example: 'IDR' })
  acc_currency: string;

  @ApiProperty({ example: 'D' })
  acc_balance_type: string;

  @ApiProperty({ example: 'cash' })
  acc_cashflow_type: string;

  @ApiProperty({ example: 'BS' })
  acc_statement: string;

  @ApiProperty({ example: 'transaction' })
  acc_type: string;

  @ApiProperty({ type: AccountTreeChildrenResponseDTO, example: [] })
  children: Omit<IAccountTreeResponse, TIgnoreAccountChildren>[];
}
