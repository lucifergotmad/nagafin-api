import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class AuthRefreshTokenRequestDTO {
  @IsRequiredString()
  username: string;

  @IsRequiredString()
  refresh_token: string;
}
