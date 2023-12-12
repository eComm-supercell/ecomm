// google.guard.ts
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class CustomersGoogleAuthGuard extends AuthGuard(
  AuthStrategy.CUSTOMERS_GOOGLE_OAUTH,
) {
  constructor() {
    super({
      accessType: 'offline',
    });
  }
}
