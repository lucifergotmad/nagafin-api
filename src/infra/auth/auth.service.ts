import { Injectable } from '@nestjs/common';
import { UserMongoEntity } from 'src/modules/user/database/model/user.mongo-entity';
import { UserRepository } from 'src/modules/user/database/user.repository.service';
import { Utils } from 'src/core/utils/utils.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginResponseDto } from 'src/modules/app/controller/dtos/auth-login.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private utils: Utils,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ username });
    if (user) {
      const passwordMatch = await this.utils.hash.compare(
        password,
        user.password,
      );

      if (passwordMatch) {
        delete user.password;
        return user;
      }
    }
    return null;
  }

  async login(user: Partial<UserMongoEntity>) {
    const payload = { sub: user.username };
    return new AuthLoginResponseDto({
      accessToken: this.jwtService.sign(payload),
      username: payload.sub,
    });
  }
}
