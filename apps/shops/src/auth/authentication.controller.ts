import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import {
  // ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  OmitType,
} from '@nestjs/swagger';
// import { JwtGuard } from '@libs/common/src/auth/guard/jwt.guard';
import { apiExceptionResponse } from '@libs/common/src/exceptions/exception.decorator';
import { AuthService } from './authentication.service';
import { CustomersPhoneAuthGuard } from '@libs/common/src/auth/guard/customers/customers-phone.guard';
import { LocalAuthResponseDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-login.dto';
// import { getLocalUser } from '@libs/common/src/users/decorators/getuser.decorator';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import {
  CustomerNativeLoginDto,
  CustomerPhoneLoginDto,
  CustomersNativeAuthResponse,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/login.dto';
import { CustomersNativeAuthGuard } from '@libs/common/src/auth/guard/customers/customers-native.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Create new Customer account using `email` & `password` (Native Strategy).
   *
   */
  @Post('/native/signup')
  @apiExceptionResponse()
  @ApiCreatedResponse({
    description: 'User created successfully',
  })
  signupCustomerByEmail(
    @Body()
    body: CustomersEmailPasswordSignupDto,
  ) {
    return this.authService.signupCustomerByEmail(body);
  }

  /**
   * Login Customers using `email` & `password` (Native Strategy).
   */
  @UseGuards(CustomersNativeAuthGuard)
  @ApiBody({ type: CustomerNativeLoginDto })
  @ApiCreatedResponse({
    type: CustomersNativeAuthResponse,
  })
  @apiExceptionResponse()
  @Post('/native/login')
  customerEmailLogin(@Request() req: any) {
    return req.user;
  }

  /**
   * Create new Customer account. After succesfull signIn from firebase, this method will be called to create new customer account. Once provided with account UID taken from firebase, Server will first check if user already exist in database. If user already exist, it will return user data. If user not exist, it will create new user and return user data.
   */
  @Post('/phone/signup')
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
  @Post('/phone/login')
  customerLogin(@Request() req: any) {
    return req.user;
  }

  /**
   * Sign in Customer with OAuth. Currently only Google & Apple OAuth is supported. After successful signin on the client side,
   * the user account id token is sent for validation. If the user is already registered, the user data will be returned along with a system JWT token.
   * If the user is not registered, the user will be registered and the user data will be returned also with the system JWT token.
   *
   */
  @Post('/idp/signin')
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
  @Get('/apple/nonce')
  @ApiOkResponse({
    type: String,
  })
  getAppleNonce() {
    return { hashedNonce: this.authService.generateNonce(32) };
  }
}
