import IdentityProviders from '@libs/common/src/enums/provider.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
