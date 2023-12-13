import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SharedUsersService } from '@libs/common/src/users/users.service';

@Injectable()
export class CustomersNativeJwtStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_NATIVE_JWT,
) {
  constructor(private readonly sharedUsersService: SharedUsersService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.sharedUsersService.findCustomerByEmail(
      payload.email,
    );
    return user; // Embed Request with User object
  }
}
