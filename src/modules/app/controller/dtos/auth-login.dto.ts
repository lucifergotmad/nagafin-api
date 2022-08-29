import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class AuthLoginRequestDTO {
  @IsRequiredString()
  username: string;

  @IsRequiredString()
  password: string;
}
