import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class CustomerNativeLoginDto {
  @ApiProperty({
    description: 'Customer email address',
    required: true,
    format: 'email',
    example: 'john@email.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password',
    required: true,
    format: 'password',
  })
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8 })
  password: string;
}
