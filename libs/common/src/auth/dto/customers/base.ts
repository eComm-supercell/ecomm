import { ApiProperty } from '@nestjs/swagger';
import {
  AuthenticationIdentifier,
  AuthenticationStartegy,
  Gender,
  UserType,
} from '@prisma/client';

export class BaseCustomersAuthResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Create date',
    example: '2021-08-31T09:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last udpate date',
    example: '2021-08-31T09:00:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Email address',
    nullable: true,
    example: 'john@example.com',
  })
  emailAddress: string | null;

  @ApiProperty({
    description: 'Account verification status',
    example: 'true',
    format: 'boolean',
  })
  verified: boolean;

  @ApiProperty({
    description: 'First name',
    example: 'john',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name',
    example: 'john',
  })
  lastName: string;

  @ApiProperty({
    description: 'Gender',
    example: 'MALE',
    enum: Gender,
  })
  gender: Gender;

  @ApiProperty({
    description: 'Profile ID',
    example: '1',
  })
  profileId: number;

  @ApiProperty({
    description:
      'User type. This is the type of user account created. It is either `CUSTOMER` or `ADMIN`',
    enum: UserType,
    example: 'CUSTOMER',
  })
  userType: UserType;
  @ApiProperty({
    description:
      'User Authentication method. This is the strategy used to login',
    example: 'google',
    enum: AuthenticationStartegy,
  })
  authenticationMethod: AuthenticationStartegy;
  @ApiProperty({
    description:
      'Identity provider. This is the identity provider used to login',
    example: 'GOOGLE',
    enum: AuthenticationIdentifier,
  })
  identifier: AuthenticationIdentifier;

  @ApiProperty({
    description: 'Access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  token: string;
}
