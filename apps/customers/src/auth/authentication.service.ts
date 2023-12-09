import { Inject, Injectable } from '@nestjs/common';
import string_decoder from 'string_decoder';
import { LocalAuthSignupDto } from '@libs/common/src/users/dto/local-startegy/user-signup.dto';
import crypto from 'crypto';
import {
  CustomerIdpSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/users/dto/customers-local-startegy/signup.dto';
import { SERVICE_NAMES } from '@libs/common/src/constants/service-names';
import { ClientProxy } from '@nestjs/microservices';
import { handleMicroserviceExceptions } from '@libs/common/src/utils/microservicesExceptionHandler';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICE_NAMES.auth.label) private clientAuth: ClientProxy,
  ) {}

  /**
   * Retrieve user information (Profile)
   *
   */
  async me(userId: number) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: 'me' }, { userId })
        .pipe(handleMicroserviceExceptions()),
    );
  }
  /**
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   * This method is used by Local Strategy
   *
   */
  async validateUser(username: string, password: string) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: 'validateUser' }, { username, password })
        .pipe(handleMicroserviceExceptions()),
    );
  }

  /**
   * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateCustomer(phone: string, _password?: string) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: 'validateCustomer' }, { phone, password: _password })
        .pipe(handleMicroserviceExceptions()),
    );
  }

  /**
   * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  async adminSignup(body: LocalAuthSignupDto) {
    return await lastValueFrom(
      this.clientAuth
        .send({ cmd: 'adminSignup' }, body)
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
        .send({ cmd: 'signupCustomerByPhone' }, body)
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
        .send({ cmd: 'customerIdpSignin' }, body)
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
}
