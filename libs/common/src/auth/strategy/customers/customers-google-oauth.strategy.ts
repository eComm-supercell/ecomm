import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CustomersGoogleStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_GOOGLE_OAUTH,
) {
  constructor(private readonly prisma: PrismaService) {
    super({
      clientID:
        '850262126055-o9v56081rgu8sq2pp5ssd181j4jncb9g.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/auth/google/callback',
      passReqToCallback: true,
      scope: ['email', 'profile'],
    });
  }

  /**
   * Finds and returns the user if exists.
   * @param email
   * @returns
   */
  async findAndReturnUser(email: string) {
    const existingUser = await this.prisma.user.findUniqueOrThrow({
      where: {
        emailAddress: email,
      },
      include: {
        authentication_method: true,
        profile: true,
      },
    });

    const {
      id,
      createdAt,
      emailAddress,
      updatedAt,
      verified,
      profile: existingUserProfile,
      authentication_method: existingUserAuthMethod,
    } = existingUser;
    if (existingUserProfile && existingUserAuthMethod) {
      const {
        firstName,
        gender,
        id: existingUserProfileId,
      } = existingUserProfile;
      const { type, strategy } = existingUserAuthMethod;
      return {
        id,
        createdAt,
        emailAddress,
        updatedAt,
        verified,
        firstName,
        gender,
        profileId: existingUserProfileId,
        userType: type,
        authenticationMethod: strategy,
      };
    }
  }

  /**
   * Creates a new user.
   * @param email
   * @param name
   */
  async createNewUser(email: string, name: string) {
    // create user
    const newUser = await this.prisma.user.create({
      data: {
        emailAddress: email,
      },
    });

    // add profile
    await this.prisma.profile.create({
      data: {
        firstName: name,
        gender: 'MALE',
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });

    // add auth method data
    await this.prisma.authentication_method.create({
      data: {
        strategy: 'OAUTH',
        type: 'CUSTOMER',
        identifier: AuthStrategy.CUSTOMERS_GOOGLE_OAUTH,
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
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
      const existingUser = await this.findAndReturnUser(user.email);
      if (existingUser) {
        return done(null, existingUser);
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          await this.createNewUser(user.email, user.name);
          const newUser = await this.findAndReturnUser(user.email);
          return done(null, newUser);
        }
      }
    }
    return done('User not found', undefined);
  }
}
