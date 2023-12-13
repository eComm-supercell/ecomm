import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { AuthGuard } from '@nestjs/passport';

export class CustomersJWTAuthGuard extends AuthGuard(
  AuthStrategy.CUSTOMERS_NATIVE_JWT,
) {}
