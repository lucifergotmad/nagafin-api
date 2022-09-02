import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class AuthRefreshTokenRequestDTO {
  @IsRequiredString({ example: 'lucifer' })
  username: string;

  @IsRequiredString({ example: '23498sdf98234-23498ydsf-23823h-sd8f324' })
  refresh_token: string;
}
