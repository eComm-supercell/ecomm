import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { Prisma } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { SharedUsersService } from '@libs/common/src/users/users.service';

@Injectable()
export class CustomersGoogleStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_GOOGLE_OAUTH,
) {
  constructor(
    readonly configService: ConfigService,
    private readonly usersService: SharedUsersService,
  ) {
    super({
      clientID: configService.get('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_AUTH_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  /**
   * Handles the callback from Google OAuth after successful user authorization.
   * Retrieves user profile information and generates a token for the user.
   * @param {any} request - The request object.
   * @param {string} accessToken - The access token obtained from Google OAuth.
   * @param {string} refreshToken - The refresh token obtained from Google OAuth.
   * @param {any} profile - The user's Google profile information.
   * @returns {Promise<any>} The user data and/or token.
   */
  async validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      name: profile.displayName,
    };

    try {
      const existingUser = await this.usersService.findCustomerByEmail(
        user.email,
      );
      if (existingUser) {
        return done(null, existingUser);
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          await this.usersService.createCustomerByEmailAndName(
            user.email,
            user.name,
          );
          const newUser = await this.usersService.findCustomerByEmail(
            user.email,
          );
          return done(null, newUser);
        }
      }
    }
    return done('User not found', undefined);
  }
}
