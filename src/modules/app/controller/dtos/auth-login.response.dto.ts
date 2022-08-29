import { ApiProperty } from '@nestjs/swagger';
import { IAuthLoginResponse } from 'src/interface-adapter/interfaces/auth-login/auth-login.response.interface';

export class AuthLoginResponseDto implements IAuthLoginResponse {
  constructor(props: IAuthLoginResponse) {
    this.accessToken = props.accessToken;
    this.username = props.username;
  }
  @ApiProperty({ example: '23498sdf98234-23498ydsf-23823h-sd8f324' })
  accessToken: string;

  @ApiProperty({ example: 'john_doe' })
  username: string;
}
