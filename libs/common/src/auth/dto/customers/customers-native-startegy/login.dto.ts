import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

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
