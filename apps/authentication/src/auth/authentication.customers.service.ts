import { ForbiddenException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import string_decoder from 'string_decoder';
import { exclude } from '@libs/common/src/utils/exclude';
import { SharedUsersService } from '@libs/common/src/users/users.service';
import {
  GoogleAuthProvider,
  OAuthProvider,
  User,
  getAuth,
  signInWithCredential,
} from 'firebase/auth';
import {
  CustomerIdpSignupDto,
  CustomersEmailPasswordSignupDto,
  CustomersSignupDto,
} from '@libs/common/src/auth/dto/customers/customers-native-startegy/signup.dto';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
import { SharedAuthService } from '@libs/common/src/auth/sharedAuth.service';
import { CustomerNativeLoginDto } from '@libs/common/src/auth/dto/customers/customers-native-startegy/login.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CustomersAuthService {
  constructor(
    private userService: SharedUsersService,
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
   * Validate customers logining in using Native Strategy (email & password)
   * @param body
   * @returns
   */
  async customerNativeLogin(body: CustomerNativeLoginDto) {
    const user = await this.prisma.user.findUnique({
      include: { profile: true, authentication_method: true },
      where: {
        emailAddress: body.email,
      },
    });

    if (!user) {
      throw new RpcException('loginFailed');
    }

    const {
      id: userId,
      lastLogin,
      verified,
      profile,
      emailAddress,
      authentication_method: customerAuthMethod,
    } = user; // destructure user object

    if (customerAuthMethod) {
      const { passwordHash } = customerAuthMethod;
      // verify password
      await this.sharedAuthService.verifyPassword(
        body.password,
        passwordHash as string,
      );
    }
    if (profile) {
      const { createdAt, firstName, lastName, gender, updatedAt } = profile; // destructure profile object

      // Return user data
      return {
        // Generate JWT token
        token: await this.sharedAuthService.generateJWtToken({
          id: userId,
        }),
        createdAt,
        updatedAt,
        lastLogin,
        verified,
        lastName,
        firstName,
        gender,
        emailAddress,
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
  async customerIdpSignin(data: CustomerIdpSignupDto) {
    const auth = getAuth(); // firebase auth
    let user: User;

    const { idToken, provider } = data; // destruct data

    if (provider === 'google') {
      // Build Firebase credential with the Google ID token.
      const authCredential = GoogleAuthProvider.credential(data.idToken);
      const signinResponse = await signInWithCredential(auth, authCredential);
      user = signinResponse.user;
    } else {
      // Build Firebase credential with the Apple ID token.
      const apple = new OAuthProvider('apple.com');
      const authCredential = apple.credential({
        idToken: idToken,
        rawNonce: 'unhashedNonce',
      });
      const signinResponse = await signInWithCredential(auth, authCredential);
      user = signinResponse.user;
    }

    // find user in system database
    const userExist = await this.userService.findCustomerByEmail(
      user.email as string,
    );
    if (userExist) {
      return {
        // Generate JWT token
        token: this.sharedAuthService.generateJWtToken({
          id: userExist.id,
          email: userExist.emailAddress,
        }),
        ...userExist,
      };
    }

    // Add user to system database if not exist
    await this.userService.createCustomerByEmailAndName(
      user.email as string,
      user.displayName as string,
    );
    const newUser = await this.userService.findCustomerByEmail(
      user.email as string,
    );

    if (newUser) {
      return {
        token: await this.sharedAuthService.generateJWtToken({
          id: newUser.id,
          email: newUser.emailAddress,
        }),
        ...newUser,
      };
    }
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
