import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { exclude } from '@libs/common/src/utils/exclude';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthSignupDto } from '@libs/common/src/auth/dto/customers/local-startegy/user-signup.dto';
import { SharedUsersService } from '@libs/common/src/users/users.service';

@Injectable()
export class AdminsAuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: SharedUsersService,
  ) {}

  async me(userId: number) {
    try {
      const user = await this.userService.findLocalUserById(userId);
      //if user not found
      if (!user) {
        throw new ForbiddenException('User not found');
      }

      //delete password
      const userWithoutPassword = exclude(user, ['password']);
      //return user

      return userWithoutPassword;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
  /**
   * Validate user using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   * This method is used by Local Strategy
   * @deprecated
   */
  async validateUser(username: string, password: string): Promise<any> {
    // Query user
    const user = await this.userService.findLocalUserByUsername(username);
    if (!user) {
      return null;
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

  /**
   * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  async adminSignup(body: LocalAuthSignupDto) {
    return await this.userService.createAdminAccount(body);
  }
}
