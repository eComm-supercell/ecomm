import { Injectable } from '@nestjs/common';
// import string_decoder from 'string_decoder';
// import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';
// import crypto from 'crypto';
// import {
//   CustomerIdpSignupDto,
//   CustomersSignupDto,
// } from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
// import { handleMicroserviceExceptions } from '@libs/common/src/utils/microservicesExceptionHandler';
// import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor() {}

  /**
   * Retrieve user information (Profile)
   *
   */
  // async me(userId: number) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'me' }, { userId })
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }
  /**
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   * This method is used by Local Strategy
   *
   */
  // async validateUser(username: string, password: string) {
  //   return await lastValueFrom(
  //     this.clientAuth
  //       .send({ cmd: 'validateUser' }, { username, password })
  //       .pipe(handleMicroserviceExceptions()),
  //   );
  // }

  // /**
  //  * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
  //  *
  //  */
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
