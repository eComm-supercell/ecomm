import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'First Name',
    type: String,
    required: false,
  })
  @IsString()
  @MinLength(2)
  firstName?: string;

  @ApiProperty({
    description: 'Last Name',
    type: String,
    required: false,
  })
  @IsString()
  @MinLength(2)
  lastName?: string;

  @ApiProperty({
    description: 'Age',
    type: 'number',
    required: false,
  })
  @IsInt()
  @Min(10, { message: 'Age must be greater than 10' })
  age?: number;
}
