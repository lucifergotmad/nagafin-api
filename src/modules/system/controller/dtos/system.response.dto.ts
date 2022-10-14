import { ApiProperty } from '@nestjs/swagger';
import { ISystemResponse } from 'src/interface-adapter/interfaces/system/system.interface';

export class SystemResponseDTO implements ISystemResponse {
  constructor(props: ISystemResponse) {
    this.company_name = props.company_name;
    this.company_address = props.company_address;
    this.npwp = props.npwp;
    this.telephone_number = props.telephone_number;
    this.fax = props.fax;
    this.email = props.email;
    this.website = props.website;
  }

  @ApiProperty({ example: 'NGTC' })
  company_name: string;

  @ApiProperty({ example: 'Jl. Cilengkrang No.115 Cibiru Bandung' })
  company_address: string;

  @ApiProperty({ example: '3284300212134' })
  npwp: string;

  @ApiProperty({ example: '0226785821' })
  telephone_number: string;

  @ApiProperty({ example: '40385' })
  fax: string;

  @ApiProperty({ example: 'nagatech@company.co.id' })
  email: string;

  @ApiProperty({ example: 'nagatech-id.com' })
  website: string;

  /* Project */

  @ApiProperty({ example: 'NGTC Finance' })
  project_name: string;

  @ApiProperty({ example: 'Finance Project made by NGTC Team.' })
  project_info: string;

  @ApiProperty({ example: '666-NGFN-001' })
  project_code: string;

  @ApiProperty({ example: 'accounting' })
  project_category?: string;

  @ApiProperty({ example: 'IDR' })
  project_currency?: string;

  @ApiProperty({ example: 'private' })
  project_type?: string;

  @ApiProperty({ example: '[BASE64 LOGO]' })
  project_logo?: string;
}
