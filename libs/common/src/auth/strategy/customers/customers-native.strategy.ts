import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { SharedAuthService } from '../../sharedAuth.service';
import { AppCustomException } from '@libs/common/src/exceptions/custom-exception';
import { SharedUsersService } from '@libs/common/src/users/users.service';

@Injectable()
export class CustomersNativeStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_NATIVE,
) {
  constructor(
    private prisma: PrismaService,
    private sharedAuthService: SharedAuthService,
    private readonly sharedUsersService: SharedUsersService,
  ) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  /*
   * Validate Customer users signing in using Native Strategy (email & password)
   */
  async validate(email: string, password: string): Promise<any> {
    try {
      // find user

      const user = await this.prisma.user.findUnique({
        include: { profile: true, authentication_method: true },
        where: {
          emailAddress: email,
        },
      });

      if (!user) {
        throw new AppCustomException('userNotFound');
      }

      const {
        id: userId,
        lastLogin,
        verified,
        profile,
        authentication_method: customerAuthMethod,
      } = user; // destructure user object

      if (customerAuthMethod) {
        const { passwordHash } = customerAuthMethod;
        // verify password
        await this.sharedAuthService.verifyPassword(
          password,
          passwordHash as string,
        );
      }
      if (profile) {
        const { createdAt, firstName, lastName, gender, updatedAt } = profile; // destructure profile object

        // Return user data
        return {
          // Generate JWT token
          token: await this.sharedAuthService.generateJWtToken({ id: userId }),
          createdAt,
          updatedAt,
          lastLogin,
          verified,
          lastName,
          firstName,
          gender,
          email,
        };
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
