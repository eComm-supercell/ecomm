import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomersNativeAuthGuard extends AuthGuard(
  AuthStrategy.CUSTOMERS_NATIVE,
) {
  constructor() {
    super();
  }
}
