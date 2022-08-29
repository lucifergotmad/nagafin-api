import { ApiProperty } from '@nestjs/swagger';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { UserResponse } from 'src/interface-adapter/interfaces/user/user.interface';

export class UserReponseDTO extends IdResponseDTO implements UserResponse {
  /**
   *
   * @param props {UserResponse}
   *
   * Transform Plain object into DTO useful for whitelisting data,
   * this will avoid data leak, and preventing return a whole bunch
   * of data to client.
   */
  constructor(props: UserResponse) {
    super(props._id);
    this.username = props.username;
  }
  @ApiProperty({ example: 'john_doe' })
  username: string;
}
