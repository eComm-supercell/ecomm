import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomersPhoneAuthGuard extends AuthGuard(
  AuthStrategy.CUSTOMERS_PHONE,
) {
  constructor() {
    super();
  }
}
