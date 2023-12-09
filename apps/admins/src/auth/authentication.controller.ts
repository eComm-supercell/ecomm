import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
import { LocalAuthGuard } from '@libs/common/src/auth/guard/local.guard';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { AuthService } from './authentication.service';
import { CustomersPhoneAuthGuard } from '@libs/common/src/auth/guard/customers-phone.guard';
import {
  LocalAuthLoginDto,
  LocalAuthResponseDto,
} from '@libs/common/src/users/dto/local-startegy/user-login.dto';
import { LocalAuthSignupDto } from '@libs/common/src/users/dto/local-startegy/user-signup.dto';
import { getLocalUser } from '@libs/common/src/users/decorators/getuser.decorator';
import {
  CustomerIdpSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/users/dto/customers-local-startegy/signup.dto';
import { CustomerPhoneLoginDto } from '@libs/common/src/users/dto/customers-local-startegy/login.dto';

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

  /**
   * Get current logged in user. Currently return Local (admin) user only.
   */
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/me')
  @ApiOkResponse({ type: LocalAuthResponseDto })
  me(@getLocalUser() user: any) {
    return user;
  }

  /**
   * Create new Customer account. After succesfull signIn from firebase, this method will be called to create new customer account. Once provided with account UID taken from firebase, Server will first check if user already exist in database. If user already exist, it will return user data. If user not exist, it will create new user and return user data.
   */
  @Post('/customer/phone/signup')
  @apiExceptionResponse()
  @ApiCreatedResponse({
    type: OmitType(LocalAuthResponseDto, ['token']),
  })
  signupCustomer(@Body() body: CustomersSignupDto) {
    return this.authService.signupCustomerByPhone(body);
  }

  /**
   * Login using phone number. This method is used for customer accounts utilizing phone number authentication method.
   */
  @UseGuards(CustomersPhoneAuthGuard)
  @ApiBody({ type: CustomerPhoneLoginDto })
  @ApiCreatedResponse({
    type: LocalAuthResponseDto,
  })
  @apiExceptionResponse()
  @Post('/customer/phone/login')
  customerLogin(@Request() req: any) {
    return req.user;
  }

  /**
   * Sign in Customer with OAuth. Currently only Google & Apple OAuth is supported. After successful signin on the client side,
   * the user account id token is sent for validation. If the user is already registered, the user data will be returned along with a system JWT token.
   * If the user is not registered, the user will be registered and the user data will be returned also with the system JWT token.
   *
   */
  @Post('/customer/idp/signin')
  @apiExceptionResponse()
  @ApiCreatedResponse({
    type: LocalAuthResponseDto,
  })
  customerIdpSignin(@Body() body: CustomerIdpSignupDto) {
    return this.authService.customerIdpSignin(body);
  }

  /**
   * Get a new `hashed nonce` for Apple Signin. This method is used for Apple Signin only.
   * See for more docs [https://firebase.google.com/docs/auth/web/apple#advanced_authenticate_with_firebase_in_nodejs]
   *
   *
   */
  @Get('/customer/apple/nonce')
  @ApiOkResponse({
    type: String,
  })
  getAppleNonce() {
    return { hashedNonce: this.authService.generateNonce(32) };
  }
}
