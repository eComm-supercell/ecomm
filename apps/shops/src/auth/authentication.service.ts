import { Inject, Injectable } from '@nestjs/common';
import string_decoder from 'string_decoder';
import crypto from 'crypto';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import { ClientProxy } from '@nestjs/microservices';
import { handleMicroserviceExceptions } from '@libs/common/src/utils/microservicesExceptionHandler';
import { lastValueFrom } from 'rxjs';
import { CustomerNativeLoginDto } from '@libs/common/src/auth/dto/customers/customers-native-startegy/login.dto';
import { ServiceMessages } from '@libs/common/src/constants/service-messages';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTHENTICATION') private clientAuth: ClientProxy) {}

  /**
   * Signup customers using email and password
   */
  async signupCustomerByEmail(body: CustomersEmailPasswordSignupDto) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: ServiceMessages.auth.customers.signupByEmail }, body)
        .pipe(handleMicroserviceExceptions()),
    );
  }

  /**
   * Login customers using email and password
   */
  async customerNativeLogin(body: CustomerNativeLoginDto) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: ServiceMessages.auth.customers.loginByEmail }, body)
        .pipe(handleMicroserviceExceptions()),
    );
  }

  /**
   * Create and signup new Customers using phone number and password. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern.
   *
   */
  async signupCustomerByPhone(body: CustomersSignupDto) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: ServiceMessages.auth.customers.signupByPhone }, body)
        .pipe(handleMicroserviceExceptions()),
    );
  }

  /**
   * Create and signup new Customers using google account. This method is used for system accounts utilizing google authentication method.
   *
   *
   */
  async customerIdpSignin(body: CustomerIdpSignupDto) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: ServiceMessages.auth.customers.IDPsignin }, body)
        .pipe(handleMicroserviceExceptions()),
    );
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
  //  * Retrieve user information (Profile)
  //  *
  //  */
  // async me(userId: number) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'me' }, { userId })
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }
  // /**
  //  * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
  //  * This method is used by Local Strategy
  //  *
  //  */
  // async validateUser(username: string, password: string) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'validateUser' }, { username, password })
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }

  /**
   * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async validateCustomer(phone: string, _password?: string) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'validateCustomer' }, { phone, password: _password })
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }

  // /**
  //  * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
  //  *
  //  */
  // async adminSignup(body: LocalAuthSignupDto) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'adminSignup' }, body)
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }
}
