import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import AuthStrategy from '@libs/common/src/enums/auth-startegy.enum';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { SharedAuthService } from '../../sharedAuth.service';

@Injectable()
export class CustomersNativeStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.CUSTOMERS_NATIVE,
) {
  constructor(
    private jwtTokenService: JwtService,
    private prisma: PrismaService,
    private sharedAuthService: SharedAuthService,
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
        throw new UnauthorizedException();
      }

      const {
        id: userId,
        lastLogin,
        verified,
        profile,
        authentication_method,
      } = user; // destructure user object

      if (authentication_method) {
        const { passwordHash } = authentication_method;
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
          token: this.jwtTokenService.sign(
            { id: userId },
            {
              secret: process.env.JWT_SECRET,
            },
          ),
          user: {
            lastLogin,
            verified,
            lastName,
            firstName,
            createdAt,
            gender,
            updatedAt,
            email,
          },
        };
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
