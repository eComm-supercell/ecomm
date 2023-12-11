import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
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

  /**
   * Hash password using argon2
   * @param password
   * @returns
   */
  hashPassword(password: string) {
    try {
      return argon.hash(password); // hashed password
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error hashing password');
    }
  }

  /**
   *
   * Verify password using argon2
   * @param inputPassword
   * @param hashedPassword
   * @returns
   */
  async verifyPassword(inputPassword: string, hashedPassword: string) {
    try {
      const passwordMatches = await argon.verify(hashedPassword, inputPassword);
      return passwordMatches;
    } catch (error) {
      console.error('Error verifying password:', error);
      throw new BadRequestException('Error verifying password');
    }
  }
}
