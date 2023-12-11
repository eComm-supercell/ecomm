import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsStrongPassword } from 'class-validator';
export class CustomerPhoneLoginDto {
  @ApiProperty({
    description: 'Customer phone number',
    required: true,
    example: '0781234567',
  })
  @IsPhoneNumber('IQ')
  phone: string;
}

export class CustomerNativeLoginDto {
  @ApiProperty({
    description: 'Customer email address',
    required: true,
    format: 'email',
    example: 'john@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    format: 'password',
  })
  @IsStrongPassword({ minLength: 8 })
  password: string;
}

export class CustomersNativeAuthResponse {}
