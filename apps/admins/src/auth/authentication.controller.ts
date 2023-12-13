import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import {
  // ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
// import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
import { LocalAuthGuard } from '@libs/common/src/auth/guard/local.guard';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { AuthService } from './authentication.service';
import {
  LocalAuthLoginDto,
  LocalAuthResponseDto,
} from '@libs/common/src/auth/dto/customers/local-startegy/user-login.dto';
import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';
// import { getLocalUser } from '@libs/common/src/users/decorators/getuser.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Login using local auth (Local Strategy) using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   */
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LocalAuthLoginDto })
  @ApiCreatedResponse({ type: LocalAuthResponseDto })
  @apiExceptionResponse()
  @Post('/admin/login')
  login(@Request() req: any) {
    return req.user;
  }

  /**
   * Signup using local auth (Local Strategy) using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   */
  @Post('/admin/signup')
  @apiExceptionResponse()
  @ApiCreatedResponse({ type: OmitType(LocalAuthResponseDto, ['token']) })
  signup(@Body() body: LocalAuthSignupDto) {
    return this.authService.adminSignup(body);
  }
}
