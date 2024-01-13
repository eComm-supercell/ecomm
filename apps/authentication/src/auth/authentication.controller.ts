import { Controller, UseFilters } from '@nestjs/common';
import crypto from 'crypto';
import string_decoder from 'string_decoder';
import { CustomersAuthService } from './authentication.customers.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  // CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import { ExceptionFilter } from '@libs/common/src/exceptions/custom-rcp-exception.filter';
import { CustomerNativeLoginDto } from '@libs/common/src/auth/dto/customers/customers-native-startegy/login.dto';
import { ServiceMessages } from '@libs/common/src/constants/service-messages';
@UseFilters(new ExceptionFilter())
@Controller('auth')
export class AuthController {
  constructor(private readonly customersAuthService: CustomersAuthService) {}

  // /**
  //  * Retrieve user information (Profile)
  //  *
  //  */
  // @MessagePattern({ cmd: 'login' })
  // async me(userId: number) {
  //   return await this.adminsAuthService.me(userId);
  // }

  // /**
  //  * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
  //  * This method is used by Local Strategy
  //  *
  //  */
  // @MessagePattern({ cmd: 'validateUser' })
  // async validateUser(username: string, password: string) {
  //   return await this.adminsAuthService.validateUser(username, password);
  // }

  // /**
  //  * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
  //  *
  //  */
  // @MessagePattern({ cmd: 'adminSignup' })
  // async adminSignup(body: LocalAuthSignupDto) {
  //   return await this.adminsAuthService.adminSignup(body);
  // }

  /**
   * Create and signup new Customers using phone number and password. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern.
   *
   */
  // @MessagePattern({ cmd: ServiceMessages.auth.customers.signupByPhone })
  // async signupCustomerByPhone(body: CustomersSignupDto) {
  //   try {
  //     return await this.customersAuthService.signupCustomerByPhone(body);
  //   } catch (error) {
  //     // NOTE: Final error comming from microservice MUST always be RpcException
  //     throw new RpcException(error);
  //   }
  // }

  /**
   * Create new Customer account using email & password.
   */

  @MessagePattern({ cmd: ServiceMessages.auth.customers.signupByEmail })
  async signupCustomerByEmail(body: CustomersEmailPasswordSignupDto) {
    try {
      return await this.customersAuthService.signupCustomerByEmail(body);
    } catch (error) {
      // NOTE: Final error comming from microservice MUST always be RpcException
      throw new RpcException(error);
    }
  }

  /**
   * Login Customers using `email` & `password` (Native Strategy).
   *
   */
  @MessagePattern({ cmd: ServiceMessages.auth.customers.loginByEmail })
  async customerNativeLogin(body: CustomerNativeLoginDto) {
    try {
      return await this.customersAuthService.customerNativeLogin(body);
    } catch (error) {
      // NOTE: Final error comming from microservice MUST always be RpcException
      throw new RpcException(error);
    }
  }

  /**
   * Create and signup new Customers using google account. This method is used for system accounts utilizing google authentication method.
   *
   */
  @MessagePattern({ cmd: ServiceMessages.auth.customers.IDPsignin })
  async signupCustomerByGoogle(body: CustomerIdpSignupDto) {
    try {
      return await this.customersAuthService.customerIdpSignin(body);
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
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
  // /**
  //  * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
  //  *
  //  */
  // @MessagePattern({ cmd: 'validateUser' })
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async validateCustomer(phone: string, _password?: string) {
  //   return await this.customersAuthService.validateCustomer(phone);
  // }
}
