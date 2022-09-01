import {
  Body,
  Controller,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RegisterUser } from 'src/modules/user/use-cases/register-user.use-case';
import { AuthService } from 'src/infra/auth/auth.service';
import { LocalAuthGuard } from 'src/infra/auth/local-auth.guard';
import { AuthLoginRequestDTO } from './dtos/auth-login.dto';
import { AuthRegisterRequestDTO } from './dtos/auth-register.dto';
import { IdResponseDTO } from 'src/interface-adapter/dtos/id.response.dto';
import { AuthLoginResponseDto } from './dtos/auth-login.response.dto';
import { HttpStatus } from 'src/core/constants/error/status-code.const';

@Controller('v1')
@ApiTags('App Authentication')
export class AppController {
  constructor(
    private authService: AuthService,
    private createUser: RegisterUser,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: AuthLoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorize user' })
  async login(@Body() body: AuthLoginRequestDTO, @Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Post('auth/register')
  @ApiCreatedResponse({ type: IdResponseDTO })
  @ApiConflictResponse({ description: 'Data already exists' })
  async register(@Body() body: AuthRegisterRequestDTO) {
    return await this.createUser.execute(body);
  }
}
