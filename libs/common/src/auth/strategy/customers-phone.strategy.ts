import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { UsersService } from '../../users/users.service';

@Injectable()
export class CustomersPhoneStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS,
) {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UsersService,
  ) {
    super({ usernameField: 'phone', passwordField: 'phone' });
  }

  /***
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validate(username: string, _password: ''): Promise<any> {
    // Query user
    const phone = username;
    const user = await this.userService.findCustomerByPhone(phone);
    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, role, username: uniqueUsername } = user;
    // Return user without password
    return {
      // Generate JWT token
      token: this.jwtTokenService.sign(
        { id, role },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
      user: {
        ...user,
        username: uniqueUsername,
      },
    };
  }
}