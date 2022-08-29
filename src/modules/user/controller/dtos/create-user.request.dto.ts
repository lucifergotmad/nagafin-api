import { IsRequiredString } from 'src/core/decorators/dto-decorators/required-string.decorator';

export class CreateUserRequestDTO {
  @IsRequiredString({ example: 'adm' })
  username: string;

  @IsRequiredString()
  password: string;
}
