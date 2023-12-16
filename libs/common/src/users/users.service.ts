import { Injectable } from '@nestjs/common';
// import * as argon2 from 'argon2';
import { PrismaService } from '@libs/common/src/prisma/prisma.service';
// import { LocalAuthSignupDto } from '../auth/dto/customers/local-startegy/user-signup.dto';
// import { CustomersSignupDto } from '../auth/dto/customers/customers-native-startegy/signup.dto';
// import Role from '@libs/common/src/enums/role.enum';
// import IdentityProviders from '@libs/common/src/enums/provider.enum';
import { FirebaseService } from '@libs/common/src/firebase/firebase.service';
// import { AppCustomException } from '@libs/common/src/exceptions/custom-exception';

@Injectable()
export class SharedUsersService {
  constructor(
    private prisma: PrismaService,
    private firebase: FirebaseService,
  ) {}

  /**
   * Customers (Shops API)
   */
  /**
   * Finds and returns Customer if exists via email.
   * @param email
   * @returns
   */
  async findCustomerByEmail(email: string) {
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
        lastName,
        gender,
        id: existingUserProfileId,
      } = existingUserProfile;
      const { type, strategy, identifier } = existingUserAuthMethod;
      return {
        id,
        createdAt,
        updatedAt,
        emailAddress,
        verified,
        firstName,
        lastName,
        gender,
        profileId: existingUserProfileId,
        userType: type,
        authenticationMethod: strategy,
        identifier,
      };
    }
  }

  /**
   * Creates a new customer user.
   * @param email
   * @param name
   */
  async createCustomerByEmailAndName(email: string, name: string) {
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
        identifier: 'GOOGLE',
        user: {
          connect: {
            id: newUser.id,
          },
        },
      },
    });
  }

  /**
   * Unified select fields for local users
   */
  private localUserSelectFields = {
    id: true,
    username: true,
    email: true,
    role: true,
    createdAt: true,
    updatedAt: true,
    fname: true,
    lname: true,
    password: true,
    profile: {
      select: {
        id: true,
        gender: true,
        dateOfBirth: true,
        mobile: true,
      },
    },
  };

  /**
   * Create Admin account (Local Strategy) using usernmae and password
   *
   */
  // async createAdminAccount(data: LocalAuthSignupDto) {
  //   // Create user
  //   const response = await this.prisma.oldUser.create({
  //     data: {
  //       // Empty wallet and profile
  //       wallet: {
  //         create: {
  //           amount: 0,
  //         },
  //       },
  //       profile: {
  //         create: {},
  //       },
  //       role: Role.admin,
  //       email: data.email,
  //       username: data.username,
  //       fname: data.firstName,
  //       lname: data.lastName,
  //       password: await argon2.hash(data.password as string),
  //     },
  //     select: this.localUserSelectFields,
  //   });
  //   const { fname, lname, ...rest } = response;
  //   return { ...rest, firstName: fname, lastName: lname };
  // }

  /**
   * Create Customer account (Custmers Local Strategy) using phone number and password
   */
  // async signupCustomerByPhone(data: CustomersSignupDto) {
  //   // Get user from firebase
  //   const firebaseUser = await this.firebase.getUserByUID(data.firebaseUID);

  //   if (!firebaseUser) {
  //     throw new AppCustomException('userNotFound');
  //   }

  //   const { uid, email, phoneNumber } = firebaseUser;

  //   // Add user to system database
  //   const response = await this.prisma.oldUser.create({
  //     data: {
  //       // Empty wallet and profile
  //       wallet: {
  //         create: {
  //           amount: 0,
  //         },
  //       },
  //       profile: {
  //         create: {},
  //       },
  //       role: Role.customer,
  //       email,
  //       username: phoneNumber, // Use phone number as username
  //       providerId: uid,
  //       provider: IdentityProviders.GOOGLE,
  //     },
  //     select: this.localUserSelectFields,
  //   });
  //   const { fname, lname, ...rest } = response;
  //   return { ...rest, firstName: fname, lastName: lname };
  // }

  // findOne(id: number) {
  //   // TODO: add DB view to get user profile
  //   return this.prisma.oldUser.findUnique({
  //     where: { id },
  //     select: {
  //       id: true,
  //       fname: true,
  //       lname: true,
  //       email: true,
  //       username: true,
  //       role: true,
  //       profile: true,
  //     },
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  /**
   * Local Users (Admins)
   */

  /**
   *
   *
   */
  // async findLocalUserByUsername(username: string) {
  //   return await this.prisma.oldUser.findUnique({
  //     where: { username },
  //     select: this.localUserSelectFields,
  //   });
  // }
  async findLocalUserById(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: this.localUserSelectFields,
    });
  }
}
