import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

/**
 * Signup DTO class for local auth (Local Strategy) using username, email and password
 */
export class LocalAuthSignupDto {
  @IsString()
  @ApiProperty({
    description: 'The username of the user',
    example: 'user',
    type: 'string',
    nullable: false,
    required: true,
  })
  username: string;

  @IsEmail()
  @ApiProperty({
    description: 'The email of the user',
    example: 'user@example.com',
    type: 'string',
    format: 'email',
    nullable: true,
    required: true,
  })
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @ApiProperty({
    description: 'The password of the user',
    example: 'password',
    type: 'string',
    format: 'password',
    nullable: false,
  })
  password: string;

  @IsString()
  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: 'string',
    nullable: false,
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: 'string',
    nullable: false,
  })
  lastName: string;
}
