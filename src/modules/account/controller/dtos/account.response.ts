import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { IAccountResponse } from 'src/interface-adapter/interfaces/account/account.interface';

// export class AccountResponseDTO
//   extends IdResponseDTO
//   implements IAccountResponse {
//   constructor(props: IAccountResponse) {
//     super(props._id);
//     this.acc_number = props.acc_number;
//     this.acc_name = props.acc_name;
//   }

//   @ApiProperty({ example: '100001' })
//   acc_number: string;

//   @ApiProperty({ example: 'KAS BESAR' })
//   acc_name: string;

//   @ApiProperty({ example: 'IDR' })
//   acc_currency: string;
// }
