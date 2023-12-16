import IdentityProviders from '@libs/common/src/enums/provider.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CustomersSignupDto {
  @ApiProperty({
    description: 'Firebase UID of the user',
    example: '1234567890',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  firebaseUID: string;
}

export class CustomerIdpSignupDto {
  @ApiProperty({
    description: 'Identity provider (Google, Apple, Facebook, etc) name.',
    example: 'google',
    type: 'string',
    enum: IdentityProviders,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(IdentityProviders)
  provider: string;
  @ApiProperty({
    description:
      'Identity provider (Google, Apple, Facebook, etc) account id token.',
    example: 'some-idp-account-id-token-string',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  idToken: string;
}
export class CustomersEmailPasswordSignupDto {
  @ApiProperty({
    description: 'Customer email',
    example: '',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer password',
    example: '',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string;

  @ApiProperty({
    description: 'Customer first name',
    example: 'John',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'Customer last name',
    example: 'Doee',
    type: 'string',
    nullable: false,
    required: true,
  })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    description: 'User gender',
    enum: Gender,
    required: true,
    default: Gender.MALE,
  })
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;
}
