import { IsOptionalString } from 'src/core/decorators/dto-decorators/optional-string.decorator';
import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class UpdateSystemRequestDTO {
  @IsRequiredString({ example: 'NGTC' })
  company_name: string;

  @IsRequiredString({ example: 'Jl. Cilengkrang No.115 Cibiru Bandung' })
  company_address: string;

  @IsRequiredString({ example: '3284300212134' })
  npwp: string;

  @IsRequiredString({ example: '0226785821' })
  telephone_number: string;

  @IsRequiredString({ example: '40385' })
  fax: string;

  @IsRequiredString({ example: 'nagatech@company.co.id' })
  email: string;

  @IsRequiredString({ example: 'nagatech-id.com' })
  website: string;

  /* Project */

  @IsRequiredString({ example: 'NGTC Accounting' })
  project_name: string;

  @IsRequiredString({ example: 'Finance Project made by NGTC Team.' })
  project_info: string;

  @IsRequiredString({ example: '666-NGFN-001' })
  project_code: string;

  @IsOptionalString({ example: 'accounting' })
  project_category: string;

  @IsOptionalString({ example: 'private' })
  project_type: string;

  @IsOptionalString({ example: 'IDR' })
  project_currency: string;

  @IsOptionalString({ example: '[BASE64 LOGO] ' })
  project_logo: string;
}
