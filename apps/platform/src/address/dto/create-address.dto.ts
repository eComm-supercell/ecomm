import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAddressDto {
  @ApiProperty({
    description: 'Street ID',
    type: String,
    required: false,
    example: 'My street name',
  })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiProperty({
    description: 'City ID',
    type: Number,
    required: false,
    example: 12,
  })
  @IsOptional()
  @IsInt()
  cityId?: number;

  @ApiProperty({
    description: 'Province ID',
    type: Number,
    required: true,
    example: 12,
  })
  @IsInt()
  provinceId: number;

  @ApiProperty({
    description: 'Latitude',
    type: Number,
    required: false,
    example: 44.3661,
    format: 'double',
  })
  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @ApiProperty({
    description: 'Longitude',
    type: Number,
    required: false,
    example: 33.3152,
    format: 'double',
  })
  @IsOptional()
  @IsLongitude()
  longitude?: number;

  @ApiProperty({
    description: 'Building Number',
    type: String,
    required: false,
    example: 'A12',
  })
  @IsOptional()
  @IsString()
  buildingNo?: string;

  @ApiProperty({
    description: 'Floor Number',
    type: String,
    required: false,
    example: 'F12',
  })
  @IsOptional()
  @IsString()
  floorNo?: string;

  @ApiProperty({
    description: 'Apartment Number',
    type: String,
    required: false,
    example: 'H1201',
  })
  @IsOptional()
  @IsString()
  apartmentNo?: string;

  @ApiProperty({
    description: 'Profile ID',
    type: Number,
    required: true,
    example: 12,
  })
  @IsInt()
  profileId: number;
}
