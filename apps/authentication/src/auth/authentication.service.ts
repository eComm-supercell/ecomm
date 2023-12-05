import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import crypto from 'crypto';
import string_decoder from 'string_decoder';
import { exclude } from '@libs/common/src/utils/exclude';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthSignupDto } from '@libs/common/src/users/dto/local-startegy/user-signup.dto';
import { UsersService } from '@libs/common/src/users/users.service';
import {
  CustomerIdpSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/users/dto/customers-local-startegy/signup.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtTokenService: JwtService,
    private userService: UsersService,
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
   * validate user using phone number. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern. `NOTE:` password is ignored.
   * @deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async validateCustomer(phone: string, _password?: string): Promise<any> {
    // Query user
    const user = await this.userService.findCustomerByPhone(phone);
    if (!user) {
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

  /**
   * Create and signup new users using username and password. This method is used for system accounts utilizing username and password authentication method. Currently admin accounts are the only system account following this pattern.
   *
   */
  async adminSignup(body: LocalAuthSignupDto) {
    return await this.userService.createAdminAccount(body);
  }

  /**
   * Create and signup new Customers using phone number and password. This method is used for system accounts utilizing phone number and password authentication method. Currently customer accounts are the only system account following this pattern.
   *
   */
  async signupCustomerByPhone(body: CustomersSignupDto) {
    return await this.userService.signupCustomerByPhone(body);
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
