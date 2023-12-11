import { ForbiddenException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import string_decoder from 'string_decoder';
import { exclude } from '@libs/common/src/utils/exclude';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@libs/common/src/users/users.service';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { SharedAuthService } from '@libs/common/src/auth/sharedAuth.service';

@Injectable()
export class CustomersAuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UsersService,
    private prisma: PrismaService,
    private sharedAuthService: SharedAuthService,
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
   * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
   * @deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateCustomer(phone: string, _password?: string): Promise<any> {
    // Query user
    const user = await this.prisma.oldUser.findUnique({
      where: { username: phone },
    });
    if (!user) {
      return null;
    }

    const { id, role, username: uniqueUsername } = user;
    // Return user without password
    return {
      // Generate JWT token
      token: await this.sharedAuthService.generateJWtToken({ id, role }),
      user: {
        ...user,
        username: uniqueUsername,
      },
    };
  }

  /**
   * Create and signup new Customers using phone number and password. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern.
   *
   */
  async signupCustomerByPhone(body: CustomersSignupDto) {
    return await this.userService.signupCustomerByPhone(body);
  }
  /**
   * Create and signup new Customers using email & password.
   *
   */
  async signupCustomerByEmail(body: CustomersEmailPasswordSignupDto) {
    const { email, password, firstName, lastName, gender } = body;

    // create user record
    const user = await this.prisma.user.create({
      data: {
        emailAddress: email,
      },
    });

    // Create user auth method record
    await this.prisma.authentication_method.create({
      data: {
        passwordHash: await this.sharedAuthService.hashPassword(password),
        type: 'CUSTOMER',
        user: {
          connect: { id: user.id },
        },
      },
    });

    try {
      // create user profile (Customer)
      await this.prisma.profile.create({
        data: {
          firstName,
          lastName,
          gender,
          user: {
            connect: { id: user.id },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(error.message);
    }

    // TODO: 1- send email verification
    // TODO: 2- send welcome email
    // TODO: 3- add default ROLE
    return { success: true };
  }

  /**
   * Create and signup new Customers using google account. This method is used for system accounts utilizing google authentication method.
   *
   *
   */
  async customerIdpSignin(body: CustomerIdpSignupDto) {
    return await this.userService.customerIdpSignin(body);
  }

  /**
   *
   * See for more docs [https://firebase.google.com/docs/auth/web/apple#advanced_authenticate_with_firebase_in_nodejs]
   */
  generateNonce(length: number) {
    const decoder = new string_decoder.StringDecoder('ascii');
    const buf = Buffer.alloc(length);
    let nonce = '';
    while (nonce.length < length) {
      crypto.randomFillSync(buf);
      nonce = decoder.write(buf);
    }
    return nonce.slice(0, length);
  }
}
