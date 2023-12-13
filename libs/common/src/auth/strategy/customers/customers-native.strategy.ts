import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { SharedAuthService } from '../../sharedAuth.service';
import { SharedUsersService } from '@libs/common/src/users/users.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class CustomersNativeStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_NATIVE_LOCAL,
) {
  constructor(
    private prisma: PrismaService,
    private sharedAuthService: SharedAuthService,
    private readonly sharedUsersService: SharedUsersService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  /*
   * Validate Customer users signing in using Native Strategy (email & password)
   */
  async validate(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          emailAddress: email,
        },
        include: {
          authentication_method: {
            select: { passwordHash: true },
          },
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }

      const { authentication_method: authMethod } = user;
      const hashedPassword = authMethod?.passwordHash;
      if (hashedPassword) {
        await this.sharedAuthService.verifyPassword(password, hashedPassword);
      } else {
        throw new UnauthorizedException();
      }
      // Return customer user
      const customer = await this.sharedUsersService.findCustomerByEmail(email);
      return {
        token: await this.sharedAuthService.generateJWtToken({
          email: customer?.emailAddress,
        }),
        ...customer,
      };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
