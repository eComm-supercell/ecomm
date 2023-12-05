import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsOptional,
} from 'class-validator';

export enum Gender {
  male = 'male',
  female = 'female',
}

export class CreateProfileDto {
  @IsDateString()
  @IsOptional()
  @ApiProperty({
    type: Date,
    description: 'Date of birth',
    format: 'date-time',
    example: '1990-01-01T00:00:00.000Z',
    required: false,
  })
  dateOfBirth: string;

  @IsMobilePhone('ar-IQ')
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'Mobile number',
    example: '07701234567',
    required: false,
  })
  mobile: string;

  @ApiProperty({
    type: String,
    description: 'Gender type',
    enum: Gender,
    required: false,
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    description: 'Address id',
    example: 1,
    required: false,
  })
  addressId: number;
}
