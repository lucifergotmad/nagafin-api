import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class AuthRegisterRequestDTO {
  @IsRequiredString()
  username: string;

  @IsRequiredString()
  password: string;
}
