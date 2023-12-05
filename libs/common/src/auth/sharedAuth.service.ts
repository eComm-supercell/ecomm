import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { UsersService } from '../users/users.service';

@Injectable()
export class SharedAuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UsersService,
  ) {}

  /***
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  async validate(username: string, password: string): Promise<any> {
    // Query user
    const user = await this.userService.findLocalUserByUsername(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    // Verify password
    if (user.password) {
      const isPasswordMatched = await argon.verify(user.password, password);
      //  Return user if password matched
      if (!isPasswordMatched) {
        return null;
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
}
