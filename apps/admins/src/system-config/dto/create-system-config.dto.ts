import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateSystemConfigDto {
  @ApiProperty({
    description: 'The start hour of a config.',
    example: '11:12:13',
    format: 'hh:mm:ss',
    required: true,
  })
  @IsString()
  startHour: string;

  @ApiProperty({
    description: 'The end hour of a config',
    example: '11:12:13',
    format: 'hh:mm:ss',
    required: true,
  })
  @IsString()
  endHour: string;

  @ApiProperty({
    description: 'Price per km',
    example: '2000.2',
    required: true,
    format: 'decimal',
    type: 'number',
  })
  @IsDecimal({ force_decimal: true, decimal_digits: '1,2' })
  pricePerKm: number;

  @ApiProperty({
    description: 'Minimum order amount',
    example: '2000.2',
    required: true,
    format: 'decimal',
    type: 'number',
  })
  @IsDecimal({ force_decimal: true, decimal_digits: '1,2' })
  minOrderAmount: number;

  @ApiProperty({
    description: 'The force close',
    example: true,
    required: true,
  })
  @IsBoolean()
  forceClose: boolean;

  @ApiProperty({
    description: 'The force close',
    example: true,
    required: true,
  })
  @IsBoolean()
  allowGuestCheckout: boolean;

  @ApiProperty({
    description: 'Force close message',
    required: true,
  })
  @IsString()
  forceCloseMessage: string;

  @ApiProperty({
    description: 'Mobile app config id',
    example: 1,
    required: true,
  })
  @IsInt()
  mobileAppConfigId: number;
}
