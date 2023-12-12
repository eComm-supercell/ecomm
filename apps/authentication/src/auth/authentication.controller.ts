import { Controller } from '@nestjs/common';
import crypto from 'crypto';
import string_decoder from 'string_decoder';
import { AdminsAuthService } from './authentication.admins.service';
import { CustomersAuthService } from './authentication.customers.service';
import { MessagePattern } from '@nestjs/microservices';
import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import { SharedUsersService } from '@libs/common/src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly adminsAuthService: AdminsAuthService,
    private readonly userService: SharedUsersService,
    private readonly customersAuthService: CustomersAuthService,
  ) {}

  /**
   * Retrieve user information (Profile)
   *
   */
  @MessagePattern({ cmd: 'login' })
  async me(userId: number) {
    return await this.adminsAuthService.me(userId);
  }

  /**
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   * This method is used by Local Strategy
   *
   */
  @MessagePattern({ cmd: 'validateUser' })
  async validateUser(username: string, password: string) {
    return await this.adminsAuthService.validateUser(username, password);
  }

  /**
   * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  @MessagePattern({ cmd: 'adminSignup' })
  async adminSignup(body: LocalAuthSignupDto) {
    return await this.adminsAuthService.adminSignup(body);
  }

  /**
   * Create and signup new Customers using phone number and password. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern.
   *
   */
  @MessagePattern({ cmd: 'signupCustomerByPhone' })
  async signupCustomerByPhone(body: CustomersSignupDto) {
    return await this.customersAuthService.signupCustomerByPhone(body);
  }

  /**
   * Create new Customer account using email & password.
   */
  @MessagePattern({ cmd: 'signupCustomerByEmail' })
  async signupCustomerByEmail(body: CustomersEmailPasswordSignupDto) {
    return await this.customersAuthService.signupCustomerByEmail(body);
  }

  /**
   * Create and signup new Customers using google account. This method is used for system accounts utilizing google authentication method.
   *
   */
  @MessagePattern({ cmd: 'signupCustomerByGoogle' })
  async signupCustomerByGoogle(body: CustomerIdpSignupDto) {
    return await this.userService.customerIdpSignin(body);
  }

  /**
   *
   * See for more docs [https://firebase.google.com/docs/auth/web/apple#advanced_authenticate_with_firebase_in_nodejs]
   */
  generateNonce(length: number) {
    const decoder = new string_decoder.StringDecoder('ascii');
    const buf = Buffer.alloc(length);
    let nonce = '';
    while (nonce.length < length) {
      crypto.randomFillSync(buf);
      nonce = decoder.write(buf);
    }
    return nonce.slice(0, length);
  }
  /**
   * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
   *
   */
  @MessagePattern({ cmd: 'validateUser' })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateCustomer(phone: string, _password?: string) {
    return await this.customersAuthService.validateCustomer(phone);
  }
}
